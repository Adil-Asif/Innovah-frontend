import React from "react";
import "./Header.scss";
import { Layout, Input, Space, Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const { Header } = Layout;
const { Search } = Input;

const CustomHeader = () => {
  return (
      <Header className="headerLayout">
        <Space direction="horizontal">
          {/* <Search placeholder="Search Ideas" size="large" enterButton /> */}
        </Space>

        <Avatar
          icon={<UserOutlined className="profileIcon" />}
          className="profilePicture"
          size={45}
        />
        {/* <Badge size="default" count={5} className="notificationIcon">
          <FontAwesomeIcon
            icon={faBell}
          />
        </Badge> */}
      </Header>
  );
};

export default CustomHeader;
