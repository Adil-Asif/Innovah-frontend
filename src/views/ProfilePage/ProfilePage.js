import React, { useEffect } from "react";
import "./ProfilePage.scss";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Layout, Row, Col } from "antd";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import GlobalIdeas from "../../assests/Images/ProfilePage.svg";
import IdeaInsight from "../../components/IdeaInsight/IdeaInsight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserDetails } from "../../Slice/initialiseUserDetailsSlice";
const { Content } = Layout;

const ProfilePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("https://innovah.herokuapp.com/Profile/").then((result) => {
      console.log(result);

      dispatch(
        setUserDetails({
          userid: result.data.userid,
          username: result.data.username,
          userrole: result.data.role,
          industry: result.data.industry,
          picture: result.data.picture,
          phoneNumber: result.data.phnum,
          resumeDesc: result.data.resume_desc,
          innovahPoints: result.data.innovahPoints,
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const userid = useSelector((state) => state.userDetails.userid);
  const username = useSelector((state) => state.userDetails.username);
  const userrole = useSelector((state) => state.userDetails.userrole);
  const industry = useSelector((state) => state.userDetails.industry);
  const picture = useSelector((state) => state.userDetails.picture);
  const phoneNumber = useSelector((state) => state.userDetails.phoneNumber);
  const resumeDesc = useSelector((state) => state.userDetails.resumeDesc);
  const innovahPoints = useSelector((state) => state.userDetails.innovahPoints);
  console.log(innovahPoints);
  return (
    <div className="profilePage">
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout className="site-layout" data-theme="dark">
          <Header />
          <Content style={{ margin: "0 16px 70px 0px" }}>
            <div className="titleSection">
              <div className="pageTitle">
                <PageTitle title="My Profile" />
              </div>
              <img src={GlobalIdeas} alt="My Profile" />
            </div>
            <div className="insights">
              <Row gutter={32}>
                <Col className="gutter-row" span={6}>
                  <ProfileDetails
                    userID={userid}
                    userName={username}
                    userIndustry={industry}
                    userRole={userrole}
                    userMobileNumber={phoneNumber}
                    imageUrl={picture}
                    innovahPoints = {innovahPoints}
                  />
                </Col>
                <Col className="gutter-row rightSection" span={17}>
                  <Col className="gutter-row ideaDescription" span={23.5}>
                    <IdeaInsight
                      icon={<FontAwesomeIcon icon={faFileLines} />}
                      description={resumeDesc}
                      title="Resume"
                    />
                  </Col>
                </Col>
              </Row>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
};

export default ProfilePage;
