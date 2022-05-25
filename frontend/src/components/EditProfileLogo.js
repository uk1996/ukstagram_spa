import React, { useState } from 'react';
import { Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import EditProfileForm from './EditProfileForm';

const EditProfileLogo = ({ style, requestUerPage }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div style={{ display: 'inline' }}>
            <EditOutlined style={style} onClick={showModal} />
            <Modal
                footer={null}
                title="프로필 수정"
                visible={isModalVisible}
                onCancel={handleCancel}
            >
                <EditProfileForm
                    setIsModalVisible={setIsModalVisible}
                    requestUerPage={requestUerPage}
                />
            </Modal>
        </div>
    );
};

export default EditProfileLogo;
