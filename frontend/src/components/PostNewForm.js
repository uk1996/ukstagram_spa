import React, { useState } from 'react';
import { Form, Button, Input, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getBase64FromFile } from '../utils/base64';
import Axios from 'axios';
import { useUrlContext } from '../utils/UrlProvider';
import { useAppContext } from '../store';
import { parseErrorMessage } from '../utils/forms';
import { useHistory } from 'react-router-dom';

const PostNewForm = ({ setIsModalVisible }) => {
    const [fieldErrors, setFieldErrors] = useState({});
    const [previewPhoto, setPreviewPhoto] = useState({
        visible: false,
        base64: null,
    });
    const [fileList, setFileList] = useState([]);
    const apiUrl = useUrlContext().defaulturl + '/api/posts/';
    const {
        store: { jwtToken },
    } = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };
    const history = useHistory();

    const handleFinish = (fieldValues) => {
        const {
            caption,
            location,
            photo: { fileList },
        } = fieldValues;

        const formData = new FormData();
        formData.append('caption', caption);
        formData.append('location', location);

        fileList.forEach((file) => {
            formData.append('photo', file.originFileObj);
        });

        Axios.post(apiUrl, formData, { headers })
            .then(() => {
                setIsModalVisible(false);
                history.go('/');
            })
            .catch((error) => {
                const { status, data: fieldErrorMessages } = error.response;
                if (typeof fieldErrorMessages === 'string') {
                    console.log(`Error) ${status} response`);
                } else {
                    setFieldErrors(parseErrorMessage(fieldErrorMessages));
                }
            });
    };
    const handleFinishFailed = () => {};
    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };
    const handlePreviewPhoto = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64FromFile(file.originFileObj);
        }

        setPreviewPhoto({
            visible: true,
            base64: file.url || file.preview,
        });
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={handleFinish}
            onFinishFailed={handleFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Photo"
                name="photo"
                rules={[
                    {
                        required: true,
                        message: '사진을 첨부해주세요.',
                    },
                ]}
                hasFeedback
                {...fieldErrors.photo}
            >
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={() => {
                        return false;
                    }}
                    onChange={handleUploadChange}
                    onPreview={handlePreviewPhoto}
                >
                    {fileList.length > 0 ? null : (
                        <div>
                            <PlusOutlined />
                            <div className="ant-upload-text">Upload</div>
                        </div>
                    )}
                </Upload>
            </Form.Item>

            <Form.Item
                label="Caption"
                name="caption"
                rules={[
                    {
                        required: true,
                        message: 'Caption을 입력해주세요.',
                    },
                ]}
                hasFeedback
                {...fieldErrors.caption}
                {...fieldErrors.non_field_errors} // 두개 이상의 필드에 걸친 에러
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="Location"
                name="location"
                {...fieldErrors.location}
                {...fieldErrors.non_field_errors} // 두개 이상의 필드에 걸친 에러
            >
                <Input />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    등록
                </Button>
            </Form.Item>

            <Modal
                visible={previewPhoto.visible}
                footer={null}
                onCancel={() => setPreviewPhoto({ visible: false })}
            >
                <img
                    src={previewPhoto.base64}
                    style={{ width: '100%' }}
                    alt="Preview"
                />
            </Modal>
        </Form>
    );
};

export default PostNewForm;
