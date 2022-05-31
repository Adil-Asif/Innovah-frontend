import React from "react";
import "./Header.scss";
import { Layout, Avatar, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { resetUserDetails } from "../../Slice/initialiseUserDetailsSlice";
import { Menu, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const CustomHeader = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const movetoHomePage = () => {
    dispatch(resetUserDetails());
    navigate("/");
  };

  const picture = useSelector((state) => state.userDetails.picture);
  return (
    <Header className="headerLayout">
      {/* <Dropdown overlay={menu}  placement="bottom">
        
      </Dropdown> */}
      <div>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                {" "}
                <div
                  onClick={() => {
                    movetoHomePage();
                  }}
                >
                  Logout
                </div>
              </Menu.Item>
            </Menu>
          }
          arrow
        >
          <Avatar src={picture} className="profilePicture" size={45} />
        </Dropdown>
      </div>
    </Header>
  );
};

export default CustomHeader;
