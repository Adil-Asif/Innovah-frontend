import React from "react";
import "./AddRequestPage.scss";
import { Layout } from "antd";

import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PageTitle from "../../components/PageTitle/PageTitle";
import AddRequestForm from "../../components/AddRequest/AddRequest";
import AddRequest from "../../assests/Images/PostRequest.svg";
const { Content } = Layout;

const AddRequestPage = () => {
  return (
    <div className="addRequestPage">
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout className="site-layout" data-theme="dark">
          <Header />
          <Content style={{ margin: "0 16px" }}>
            <div className="titleSection">
              <div className="pageTitle">
                <PageTitle title="Post Request" />
              </div>
              <img src={AddRequest} alt="Add Request" />
            </div>
            <div className="reqform">

            <AddRequestForm />
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
};

export default AddRequestPage;
