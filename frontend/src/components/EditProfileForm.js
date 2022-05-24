import React, { useState } from 'react';
import { useMyUserContext } from '../utils/MyUserProvider';
import { Form, Upload, Input, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getBase64FromFile } from '../utils/base64';
import { useUrlContext } from '../utils/UrlProvider';

const EditProfileForm = () => {
    const { myUser } = useMyUserContext();
    const [fieldErrors, setFieldErrors] = useState({});
    const [previewPhoto, setPreviewPhoto] = useState({
        visible: false,
        base64: null,
    });
    const defaultUrl = useUrlContext().defaulturl;

    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: defaultUrl + myUser.avatar_url,
        },
    ]);

    const handleFinish = () => {};
    const handleFinishFailed = () => {};
    const handleUploadChange = ({ fileList }) => {
        console.log(fileList);
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
    console.log(myUser.avatar);

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
                label="avatar"
                name="avatar"
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
                label="username"
                name="username"
                initialValue={myUser.username}
                rules={[
                    {
                        required: true,
                        message: 'username을 입력해주세요.',
                    },
                ]}
                hasFeedback
                {...fieldErrors.caption}
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
                    수정
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

export default EditProfileForm;
