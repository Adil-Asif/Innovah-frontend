import { React, useState, useEffect } from "react";
// import React from "react";
import "./GlobalIdeasPage.scss";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Layout, Row, Col } from "antd";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import GlobalIdeas from "../../assests/Images/GlobalIdeas.svg";
import IdeasItem from "../../components/IdeasItem/IdeasItem";
import axios from "axios";
import { useSelector } from "react-redux";
const { Content } = Layout;

const GlobalIdeasPage = () => {
  const [ideaList, setIdeaList] = useState([]);

  const industry = useSelector((state) => state.userDetails.industry);
  const userrole = useSelector((state) => state.userDetails.userrole);
  useEffect(() => {
    axios
      .get("http://localhost:5000/ideas/myideas/globalidea", {
        params: {
          userrole: userrole,
          ideaindustry: industry.replace(" ", ""),
        },
      })
      .then((result) => {
        console.log(result);
        setIdeaList(result.data);
      });
  }, []);
  return (
    <div className="globalIdeasPage">
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout className="site-layout" data-theme="dark">
          <Header />
          <Content style={{ margin: "0 16px" }}>
            <div className="titleSection">
              <div className="pageTitle">
                <PageTitle title="Global Ideas" />
              </div>
              <img src={GlobalIdeas} alt="Global Ideas" />
            </div>
            <div>
              <div className="ideaItemsDashboard">
                <div className="ideaItems">
                  <Row gutter={32}>
                    {ideaList.map((ideaItem) => (
                      <Col className="gutter-row" span={8}>
                        <div>
                          <IdeasItem
                            ideaid={ideaItem.ideaid}
                            ideaName={ideaItem.title}
                            description={ideaItem.description}
                            imageUrl={ideaItem.image}
                            isApproved = {ideaItem.isapproved}
                            global={true}
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

export default GlobalIdeasPage;
