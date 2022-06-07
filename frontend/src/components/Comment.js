import React, { useState } from 'react';
import { Input, Button, Form, Col, Row } from 'antd';
import Axios from 'axios';
import { useUrlContext } from '../utils/UrlProvider';
import { useAppContext } from '../store';

const Comment = ({ postPk, refetch }) => {
    const [commentState, setCommentState] = useState('');
    const defaultUrl = useUrlContext().defaulturl;
    const {
        store: { jwtToken },
    } = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };

    const onChange = (e) => {
        setCommentState(e.target.value);
    };

    const onFinish = (values) => {
        setCommentState('');
        const { comment: message } = values;
        Axios.post(
            defaultUrl + `/api/posts/${postPk}/comments/`,
            { message },
            { headers },
        ).then(() => {
            refetch();
        });
    };

    return (
        <Form
            name="basic"
            wrapperCol={{
                span: 24,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item name="comment" style={{ margin: '0px' }}>
                <Row>
                    <Col span={20}>
                        <Input
                            style={{
                                border: 'none',
                            }}
                            placeholder="댓글 달기..."
                            onChange={onChange}
                            value={commentState}
                        />
                    </Col>
                    <Col span={4}>
                        <div style={{ textAlign: 'center' }}>
                            <Button
                                type="text"
                                style={{
                                    color: '#CCCCFF',
                                    padding: '0px',
                                }}
                                htmlType="submit"
                                disabled={commentState.length === 0}
                            >
                                <span style={{ fontSize: 'min(1.5vm, 15px)' }}>
                                    게시
                                </span>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    );
};

export default Comment;
