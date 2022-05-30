import React, { useEffect, useState } from 'react';
import { useMyUserContext } from '../utils/MyUserProvider';
import { Form, Upload, Input, Button, Modal, notification } from 'antd';
import { PlusOutlined, SmileOutlined } from '@ant-design/icons';
import { getBase64FromFile } from '../utils/base64';
import { useUrlContext } from '../utils/UrlProvider';
import Axios from 'axios';
import { useAppContext } from '../store';
import { parseErrorMessage } from '../utils/forms';
import PasswordChangeForm from './PasswordChangeForm';

const EditProfileForm = ({ setIsModalVisible, requestUerPage }) => {
    const { myUser, setMyUser } = useMyUserContext();
    const [fieldErrors, setFieldErrors] = useState({});
    const [previewPhoto, setPreviewPhoto] = useState({
        visible: false,
        base64: null,
    });
    const defaultUrl = useUrlContext().defaulturl;
    const [fileList, setFileList] = useState([]);
    const {
        store: { jwtToken },
    } = useAppContext();
    const [showPasswordChangeModal, setShowPasswordChangeModal] =
        useState(false);

    const PasswordChangeClick = () => {
        setIsModalVisible(false);
        setShowPasswordChangeModal(true);
    };

    useEffect(() => {
        if (myUser.avatar) {
            setFileList([
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: myUser.avatar,
                },
            ]);
        }
    }, [myUser, defaultUrl]);

    const handleFinish = (fieldValues) => {
        const {
            avatar,
            introduction,
            first_name,
            last_name,
            email,
            website_url,
            phone_number,
        } = fieldValues;

        console.log(fieldValues);

        const headers = { Authorization: `Bearer ${jwtToken}` };

        const formData = new FormData();
        formData.append('introduction', introduction);
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('email', email);
        formData.append('website_url', website_url);
        formData.append('phone_number', phone_number);

        if (avatar) {
            const { fileList } = avatar;

            if (fileList.length > 0) {
                fileList.forEach((file) => {
                    formData.append('avatar', file.originFileObj);
                });
            } else {
                formData.append('avatar', null);
            }
        }

        Axios.patch(defaultUrl + `/accounts/users/${myUser.pk}/`, formData, {
            headers,
        })
            .then(() => {
                notification.open({
                    message: '프로필 수정 완료',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                });
                setIsModalVisible(false);
                requestUerPage({ headers });
                Axios.get(defaultUrl + '/accounts/users/me/', { headers })
                    .then((response) => {
                        setMyUser(response.data);
                    })
                    .catch((error) => {
                        console.log(error.response);
                    });
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
                label="Avatar"
                name="avatar"
                hasFeedback
                {...fieldErrors.avatar}
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
                label="Introduction"
                name="introduction"
                initialValue={myUser.introduction}
                {...fieldErrors.introduction}
            >
                <Input.TextArea
                    rows={2}
                    placeholder="최대 30글자"
                    maxLength={30}
                />
            </Form.Item>

            <Form.Item
                label="First Name"
                name="first_name"
                initialValue={myUser.first_name}
                {...fieldErrors.first_name}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Last Name"
                name="last_name"
                initialValue={myUser.last_name}
                {...fieldErrors.last_name}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                initialValue={myUser.email}
                {...fieldErrors.email}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Website Url"
                name="website_url"
                initialValue={myUser.website_url}
                {...fieldErrors.website_url}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Phone Number"
                name="phone_number"
                initialValue={myUser.phone_number}
                {...fieldErrors.phone_number}
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
                <Button
                    style={{
                        marginLeft: '0.5rem',
                        backgroundColor: '#999999',
                        color: 'white',
                    }}
                    onClick={PasswordChangeClick}
                >
                    비밀번호 변경
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

            <Modal
                title="비밀번호 변경"
                visible={showPasswordChangeModal}
                footer={null}
                onCancel={() => setShowPasswordChangeModal(false)}
            >
                <PasswordChangeForm
                    setShowPasswordChangeModal={setShowPasswordChangeModal}
                />
            </Modal>
        </Form>
    );
};

export default EditProfileForm;
