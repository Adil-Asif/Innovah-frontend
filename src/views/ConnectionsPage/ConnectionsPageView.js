import React from "react";
// import "../PageLayout/PageLayout.style.scss";

import { Layout } from "antd";

import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PageTitle from "../../components/PageTitle/PageTitle";

import ConnectionsPage from "./../../components/ConnectionsPage";
const { Content } = Layout;
// <PageTitle title="My Request" />
const ConnectionsPageView = () => {
    return (
        <div>
            <Layout style={{ minHeight: "100vh" }}>
                <Sidebar />
                <Layout className="site-layout" data-theme="dark">
                    <Header />
                    <Content style={{ margin: '0 16px' }}>
                        <PageTitle title="Connections" />
                        <ConnectionsPage />
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        </div>
    );
};

export default ConnectionsPageView;
