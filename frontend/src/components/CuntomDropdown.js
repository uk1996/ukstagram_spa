import React from 'react';
import { Menu, Dropdown } from 'antd';

const CustomDropdown = ({ items, logo, buttontype }) => {
    const menu = <Menu items={items} />;

    return (
        <Dropdown overlay={menu} placement="bottom" arrow>
            <div style={{ cursor: 'pointer' }}>{logo}</div>
        </Dropdown>
    );
};

export default CustomDropdown;
