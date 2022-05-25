import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Card, Form, Input, Button, notification } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import { deleteToken, useAppContext } from '../../store';
import AppLayout from '../../components/AppLayout';

const apiUrl = 'http://localhost:8000/accounts/signup/';

const Signup = () => {
    const history = useHistory();

    const [fieldErrors, setFieldErrors] = useState({});
    const {
        store: { isAuthenticated },
        dispatch,
    } = useAppContext();

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(deleteToken());
        }
    }, [dispatch, isAuthenticated]);

    const onFinish = (values) => {
        const { username, password } = values;

        setFieldErrors({});

        const data = { username, password };
        Axios.post(apiUrl, data)
            .then((response) => {
                notification.open({
                    message: '회원가입 성공',
                    description: '로그인 페이지로 이동합니다.',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                });
                history.push('/accounts/login/');
            })
            .catch((error) => {
                if (error.response) {
                    notification.open({
                        message: '회원가입 실패',
                        description: '아이디/암호를 확인해주세요.',
                        icon: <FrownOutlined style={{ color: '#ff3333' }} />,
                    });

                    const { data: fieldsErrorMessage } = error.response;

                    setFieldErrors(
                        Object.entries(fieldsErrorMessage).reduce(
                            (acc, [fieldName, errors]) => {
                                // errors : ["m1", "m2"]
                                acc[fieldName] = {
                                    validateStatus: 'error',
                                    help: errors.join(' '),
                                };
                                return acc;
                            },
                            {}, // 초기값
                        ),
                    );
                }
            })
            .finally(() => {});
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <AppLayout>
            <Card title="회원가입">
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
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                        hasFeedback
                        {...fieldErrors.username}
                    >
                        <Input name="username" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 8,
                                message: '8자리 이상을 입력하세요.',
                            },
                        ]}
                        {...fieldErrors.password}
                    >
                        <Input.Password name="password" />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            회원가입
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </AppLayout>
    );
};

export default Signup;
