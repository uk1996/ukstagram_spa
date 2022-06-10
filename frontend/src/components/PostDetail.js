import React from 'react';
import { Col, Row } from 'antd';

const PostDetail = ({ photo, caption, author, is_like }) => {
    return (
        <Row>
            <Col span={16}>
                <img src={photo} alt={caption} style={{ width: '100%' }} />
            </Col>
            <Col span={8} style={{ padding: '2%' }}>
                TODO
            </Col>
        </Row>
    );
};

export default PostDetail;
