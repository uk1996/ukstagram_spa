import React, { useState } from 'react';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { Card, Form, Input, Button, notification } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import Axios from 'axios';
// import useLocalStorage from '../../utils/useLocalStorage';
import { useAppContext, setToken } from '../../store';
import { useUrlContext } from '../../utils/UrlProvider';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import { parseErrorMessage } from '../../utils/forms';
const Login = () => {
    const {
        store: { isAuthenticated },
        dispatch,
    } = useAppContext();
    const history = useHistory();
    // const [jwtToken, setJwtToken] = useLocalStorage('jwtToken', '');
    const [fieldErrors, setFieldErrors] = useState({});
    const location = useLocation();

    const apiUrl = useUrlContext().defaulturl + '/accounts/api-jwt-auth/';

    const {
        from: { pathname: loginRedirectUrl },
    } = location.state || { from: { pathname: '/' } };

    if (isAuthenticated) {
        return (
            <div>
                <Redirect
                    to={{
                        pathname: '/',
                        state: { from: '/accounts/login/' },
                    }}
                />
                ;
            </div>
        );
    }

    const onFinish = (values) => {
        const { username, password } = values;

        setFieldErrors({});

        const data = { username, password };
        Axios.post(apiUrl, data)
            .then((response) => {
                // notification.open({
                //     message: '로그인 성공',
                //     icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                // });
                const {
                    data: { token },
                } = response;
                dispatch(setToken(token));

                history.push(loginRedirectUrl);
            })
            .catch((error) => {
                if (error.response) {
                    notification.open({
                        message: '로그인 실패',
                        description: '아이디/암호를 확인해주세요.',
                        icon: <FrownOutlined style={{ color: '#ff3333' }} />,
                    });

                    const { data: fieldsErrorMessages } = error.response;

                    setFieldErrors(parseErrorMessage(fieldsErrorMessages));
                }
            })
            .finally(() => {});
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <AppLayout>
            <Card title="로그인">
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
                        {...fieldErrors.non_field_errors} // 두개 이상의 필드에 걸친 에러
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
                            로그인
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <div style={{ textAlign: 'center', opacity: '0.5' }}>
                <Link to="/accounts/signup/">
                    <Button type="text">회원가입</Button>
                </Link>
            </div>
        </AppLayout>
    );
};

export default Login;
