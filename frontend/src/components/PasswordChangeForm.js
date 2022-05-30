import { Form, Input, Button, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useUrlContext } from '../utils/UrlProvider';
import Axios from 'axios';
import { useAppContext, deleteToken } from '../store';
import { parseErrorMessage } from '../utils/forms';

const PasswordChangeForm = ({ setShowPasswordChangeModal }) => {
    const [fieldErrors, setFieldErrors] = useState({});
    const defaultUrl = useUrlContext().defaulturl;
    const {
        dispatch,
        store: { jwtToken },
    } = useAppContext();

    const onFinish = (values) => {
        const { old_password, new_password, new_password_confirm } = values;
        const data = { old_password, new_password, new_password_confirm };
        const headers = { Authorization: `Bearer ${jwtToken}` };

        Axios.patch(defaultUrl + '/accounts/password_change/', data, {
            headers,
        })
            .then(() => {
                setShowPasswordChangeModal(false);
                notification.open({
                    message: '비밀번호 변경 성굥',
                    description: '변경된 비밀번호로 로그인 해주세요',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                });
                dispatch(deleteToken());
            })
            .catch((error) => {
                if (error.response) {
                    const { data: fieldsErrorMessage } = error.response;

                    setFieldErrors(parseErrorMessage(fieldsErrorMessage));
                }
            });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                name="password_change"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Old Password"
                    name="old_password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your old password!',
                        },
                        {
                            min: 8,
                            message: '8자리 이상을 입력하세요.',
                        },
                    ]}
                    hasFeedback
                    {...fieldErrors.old_password}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="New Password"
                    name="new_password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your new password!',
                        },
                        {
                            min: 8,
                            message: '8자리 이상을 입력하세요.',
                        },
                    ]}
                    hasFeedback
                    {...fieldErrors.new_password}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="New Password Confirm"
                    name="new_password_confirm"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your new password confirm!',
                        },
                        {
                            min: 8,
                            message: '8자리 이상을 입력하세요.',
                        },
                    ]}
                    hasFeedback
                    {...fieldErrors.new_password_confirm}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        변경
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default PasswordChangeForm;
