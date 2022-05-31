import React, { useEffect, useState } from "react";
import "./MyIdeasPage.scss";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Layout, Row, Col } from "antd";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MyIdea from "../../assests/Images/MyIdeas.svg";
import IdeasItem from "../../components/IdeasItem/IdeasItem";
import axios from "axios";
const { Content } = Layout;

const MyIdeasPage = () => {
  const [ideaList, setIdeaList] = useState([]);
  const [updateIdea, setUpdateIdea] = useState(false);
  const updateStatus = () => {
    if (updateIdea) {
      setUpdateIdea(false);
    } else {
      setUpdateIdea(true);
    }
  };
  useEffect(() => {
    axios.get("https://innovah.herokuapp.com/ideas/myideas").then((result) => {
      setIdeaList(result.data);
    });
  }, [updateIdea]);
  return (
    <div className="myIdeasPage">
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout className="site-layout" data-theme="dark">
          <Header />
          <Content style={{ margin: "0 16px" }}>
            <div className="titleSection">
              <div className="pageTitle">
                <PageTitle title="My Ideas" />
              </div>
              <img src={MyIdea} alt="My Ideas" />
            </div>
            <div>
              <div className="ideaItemsDashboard">
                <div className="ideaItems">
                  <Row gutter={32}>
                    {ideaList.map((ideasIteam) => (
                      <Col className="gutter-row" span={8}>
                        <div style={{ paddingTop: "40px" }}>
                          <IdeasItem
                            ideaName={ideasIteam.title}
                            description={ideasIteam.description}
                            imageUrl={ideasIteam.image}
                            ideaid={ideasIteam.ideaid}
                            updateIdeas={updateStatus}
                            global={false}
                          />
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
};

export default MyIdeasPage;
