import React, { useEffect, useState } from "react";
import "./SpecificProject.scss";

import { Layout, Spin } from "antd";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PageTitle from "../../components/PageTitle/PageTitle";
import AI_image from "./../../assests/Images/ProjectManagement/AI_project.jpg";
import specificprojectimg from "./../../assests/Images/specificproject.svg";
import taskImage from "./../../assests/Images/ProjectManagement/Daco_219372.png";
import Inventory from "./../../assests/Images/ProjectManagement/production.png";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const { Content } = Layout;

const SpecificProject = () => {
  const userId = useSelector(
    (state) => state.userDetails.userid
  )
  const [projectDetails, setProjectDetails] = useState([{}]);
  let params = useParams();
  let navigate = useNavigate();
  const navigationToBoards = () => {
    navigate(`/projectmanagement/${params.projectid}/workItems`);
  };
  const navigationToInventory = () => {
    navigate(`/projectmanagement/${params.projectid}/Inventory`);
  };
  console.log(params.projectid);
  const fetchProjectDetails = async () => {
    let response = await fetch(
      //get API =  URL / generalproject/userid/projectid
      `https://innovah.herokuapp.com/generalproject/${userId}/${params.projectid}`
    );
    setProjectDetails(await response.json());
  };
  useEffect(() => {
    fetchProjectDetails();
  }, []);
  console.log(projectDetails, "Project Detaisl");
  return (
    <div className="specificProjectPage">
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar PageKey="9" />
        <Layout className="site-layout" data-theme="dark">
          <Header />
          {projectDetails !== [] ? (
            <Content style={{ margin: "0 16px" }}>
              <div className="titleSection">
                <div className="Project-heading">
                  <PageTitle title={`${projectDetails[0].projecttitles}`} />
                </div>
                <img src={specificprojectimg} alt="Specific Project" />
              </div>
              <div className="project-container">
                <div className="project-description">
                  <span className="title-of-page">About This Project:</span>{" "}
                  <br />
                  {`${projectDetails[0].description}`}
                </div>
                <div className="project-tracking">
                  <div className="project-status">
                    <span className="tracking-heading"> Project Status </span>

                    <div
                      onClick={() => {
                        navigationToBoards();
                      }}
                      className="tasks"
                    >
                      <span className="sidebar-heads"> Boards </span> <br />
                      <div className="specific-task">
                        <img src={taskImage} alt="" />
                        <span className="specific-fields-side">
                          {" "}
                          {projectDetails[0].todotask} task created{" "}
                        </span>
                      </div>
                      <div className="specific-task">
                        <img src={taskImage} alt="" />
                        <span className="specific-fields-side">
                          {" "}
                          {projectDetails[0].completed} task completed{" "}
                        </span>
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        navigationToInventory();
                      }}
                      className="tasks"
                    >
                      <span className="sidebar-heads"> Inventory </span> <br />
                      <div className="specific-task">
                        <img src={Inventory} alt="" />
                        <span className="specific-fields-side">
                          {" "}
                          {projectDetails[0].unutilized} Items Available{" "}
                        </span>
                      </div>
                      <div className="specific-task">
                        <img src={Inventory} alt="" />
                        <span className="specific-fields-side">
                          {" "}
                          {projectDetails[0].utilized} Items Consumed{" "}
                        </span>{" "}
                      </div>
                    </div>
                  </div>

                  <div className="members-list">
                    <span className="member-heading"> Members </span> <br />
                    <div className="member-images">
                      <img src={AI_image} alt="" srcset="" />
                    </div>
                    <div className="member-images">
                      <img src={AI_image} alt="" srcset="" />
                    </div>
                    <div className="member-images">
                      <img src={AI_image} alt="" srcset="" />
                    </div>
                    <div className="member-images">
                      <img src={AI_image} alt="" srcset="" />
                    </div>
                  </div>

                  <div className="Services-list">
                    <span className="Service-heading"> Services </span> <br />
                    <div className="Service-images">
                      <img src={AI_image} alt="" srcset="" />
                    </div>
                    <div className="Service-images">
                      <img src={AI_image} alt="" srcset="" />
                    </div>
                  </div>
                </div>
              </div>
            </Content>
          ) : (
            <Spin size="large" />
          )}
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
};

export default SpecificProject;
