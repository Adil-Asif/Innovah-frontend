import "./Sidebar.scss";
import Logo from "../../assests/Images/Logo.png";
import { Layout, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircle } from "@fortawesome/free-solid-svg-icons";
import DashboardIcon from "../../assests/Images/Icons/Dashboard.png";
import IdeaIcon from "../../assests/Images/Icons/Idea.png";
import RequestIcon from "../../assests/Images/Icons/Request.png";
import LearnigResourcesIcon from "../../assests/Images/Icons/LearningResources.png";
import ProjectManagementIcon from "../../assests/Images/Icons/ProjectManagement.png";
import ProfilePageIcon from "../../assests/Images/Icons/profilePageIcon.png";
import CompetitionIcon from "../../assests/Images/Icons/Competition.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = (props) => {
  const userrole = useSelector((state) => state.userDetails.userrole);
  let navigate = useNavigate();
  const movetoProfilePage = () => {
    navigate("/profilepage");
  };
  const moveToAddIdea = () => {
    navigate("/addidea");
  };
  const moveToMyIdeas = () => {
    navigate("/myideas");
  };
  const moveToGlobalIdeas = () => {
    navigate("/globalideas");
  };
  const moveToAddRequest = () => {
    navigate("/addrequest");
  };
  const moveToMyRequest = () => {
    navigate("/myrequests");
  };
  const moveToGlobalRequests = () => {
    navigate("/globalrequests");
  };
  const navigatetoLearningResources = () => {
    navigate("/learningresources");
  };
  const projectManagementpage = () => {
    navigate("/projectmanagement/");
  };
  const movetocompetitons = () => {
    navigate("/competitons");
  };
  const moveToRewards = () => {
    navigate("/rewards");
  };

  return (
    <Sider className="siderLayout">
      <div>
        <img alt="LOGO" src={Logo} className="Logo" />
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={[props.PageKey]}
        mode="inline"
        className="menu"
      >
        <Menu.Item
          onClick={() => {
            movetoProfilePage();
          }}
          key="13"
          className="antTitle"
          icon={
            <img
              alt="Profile Page Icon"
              src={ProfilePageIcon}
              style={{ width: "28px" }}
              className="customIcon"
            />
          }
        >
          My Profile
        </Menu.Item>
        {userrole === "Innovator" ? (
          <SubMenu
            key="sub1"
            className="antTitle"
            icon={<img alt="Idea Icon" src={IdeaIcon} className="customIcon" />}
            title="Ideas"
          >
            <Menu.Item
              onClick={() => {
                moveToAddIdea();
              }}
              key="2"
              icon={
                <FontAwesomeIcon
                  icon={faPlus}
                  className="fontAwesomePlusIcon customIcon"
                />
              }
            >
              Add Idea
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                moveToMyIdeas();
              }}
              key="3"
              icon={<FontAwesomeIcon icon={faCircle} className="customIcon" />}
            >
              My Ideas
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                moveToGlobalIdeas();
              }}
              key="4"
              icon={<FontAwesomeIcon icon={faCircle} className="customIcon" />}
            >
              All Ideas
            </Menu.Item>
          </SubMenu>
        ) : (
          <Menu.Item
            onClick={() => {
              moveToGlobalIdeas();
            }}
            key="4"
            icon={<img alt="Idea Icon" src={IdeaIcon} className="customIcon" />}
          >
            All Ideas
          </Menu.Item>
        )}
        {userrole === "Innovator" ? (
          <SubMenu
            key="sub2"
            className="antTitle"
            icon={
              <img
                alt="Request Icon"
                src={RequestIcon}
                className="customIcon"
              />
            }
            title="Requests"
          >
            <Menu.Item
              onClick={() => {
                moveToAddRequest();
              }}
              key="5"
              icon={
                <FontAwesomeIcon
                  icon={faPlus}
                  className="fontAwesomePlusIcon customIcon"
                />
              }
            >
              Post Request
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                moveToMyRequest();
              }}
              key="6"
              icon={<FontAwesomeIcon icon={faCircle} className="customIcon" />}
            >
              My Requests
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                moveToGlobalRequests();
              }}
              key="7"
              icon={<FontAwesomeIcon icon={faCircle} className="customIcon" />}
            >
              All Requests
            </Menu.Item>
          </SubMenu>
        ) : (
          <Menu.Item
            onClick={() => {
              moveToGlobalRequests();
            }}
            key="7"
            icon={
              <img
                alt="Request Icon"
                src={RequestIcon}
                className="customIcon"
              />
            }
          >
            All Requests
          </Menu.Item>
        )}
        <Menu.Item
          onClick={() => {
            navigatetoLearningResources();
          }}
          key="8"
          className="extraMargin antTitle"
          icon={
            <img
              alt="Learning Resources Icon"
              src={LearnigResourcesIcon}
              className="customIcon"
            />
          }
        >
          Learning
          <br />
          Resources
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            projectManagementpage();
          }}
          className="antTitle"
          key="9"
          icon={
            <img
              alt="Project Management Icon"
              src={ProjectManagementIcon}
              className="customIcon"
            />
          }
        >
          Project Management
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            movetocompetitons();
          }}
          className="antTitle"
          key="10"
          icon={
            <img
              alt="Competition Icon"
              src={CompetitionIcon}
              className="customIcon"
            />
          }
        >
          Competitions
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            moveToRewards();
          }}
          className="antTitle"
          key="1"
          icon={
            <img
              alt="Reward Icon"
              src={DashboardIcon}
              className="customIcon dashboardIcon"
            />
          }
        >
          Rewards
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
