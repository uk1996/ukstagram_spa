import React, { useState } from 'react';
import { Card, Form, Button, Input } from 'antd';

const PostNewForm = () => {
    const [fieldErrors] = useState({});

    const handleFinish = () => {};
    const handleFinishFailed = () => {};

    return (
        <Card title="새 포스팅">
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
    );
};

export default PostNewForm;
