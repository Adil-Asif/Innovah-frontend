import { React, useState } from "react";
import "./RewardPage.scss";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Layout, Button, Modal, Form, Input, InputNumber } from "antd";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import RewardItem from "../../components/RewardItem/RewardItem";
import RewardImage from "../../assests/Images/Rewards.svg";
import { useSelector } from "react-redux";
const { Content } = Layout;
const { TextArea } = Input;

const RewardPage = () => {
  const userrole = useSelector((state) => state.userDetails.userrole);
  const [rewardItem, setRewardItem] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();


  const onSubmit = (values) => {
    setRewardItem(values);
    setIsModalVisible(false);
    console.log(rewardItem);
  };

  return (
    <div className="rewardPage">
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout className="site-layout" data-theme="dark">
          <Header />
          <Content style={{ margin: "0 16px 70px 0px" }}>
            <div className="titleSection">
              <div>
                <div className="pageTitle">
                  <PageTitle title="Reward Shop" />
                </div>
                {userrole === "Administrator" ? (
                  <>
                    <div>
                      {" "}
                      <Button
                        type="primary"
                        className="left"
                        style={{ marginRight: "4%", borderRadius: "8px" }}
                        onClick={() => {
                          setIsModalVisible(true);
                        }}
                      >
                        Add Reward
                      </Button>
                    </div>
                    <Modal
                      centered
                      title="Add Reward"
                      visible={isModalVisible}
                      okText="Submit"
                      cancelText="Cancel"
                      onCancel={() => {
                        setIsModalVisible(false);
                      }}
                      onOk={() => {
                        form
                          .validateFields()
                          .then((values) => {
                            form.resetFields();
                            onSubmit(values);
                          })
                          .catch((info) => {
                            console.log("Validate Failed:", info);
                          });
                      }}
                      className="addRewardForm"
                    >
                      <div className="rewardForm">
                        <Form form={form}>
                          <Form.Item
                            name="rewardTitle"
                            label="Reward Tile"
                            rules={[
                              {
                                required: true,
                                message: "Please enter reward title",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter Reward Title"
                              showCount
                              maxLength={50}
                            />
                          </Form.Item>
                          <Form.Item
                            name="rewardDescription"
                            label="Reward Description"
                            rules={[
                              {
                                required: true,
                                message: "Please enter reward description",
                              },
                            ]}
                          >
                            <TextArea showCount maxLength={3000} />
                          </Form.Item>
                          <div className="rewardPoints">
                            <Form.Item
                              name="rewardPoints"
                              label="Reward Points"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter reward points",
                                },
                              ]}
                            >
                              <InputNumber />
                            </Form.Item>
                          </div>
                        </Form>
                      </div>
                    </Modal>
                  </>
                ) : (
                  <>
                    {console.log(userrole)}
                    <div className="innovahPoints">
                      Your IP Points: <span className="points">1150</span>
                    </div>
                  </>
                )}
              </div>
              <img src={RewardImage} alt="Reward Shop" />
            </div>
            <div className="rewardItemContainer">
              <div className="rewardItem">
                <RewardItem
                  listNumber="1"
                  title="Python Bootcamp 2022"
                  description="This course aims to teach everyone the basics of programming computers using Python. We cover the basics of how one constructs a program from a series of simple instructions in Python. The course has no pre-requisites and avoids all but the simplest mathematics. Anyone with moderate computer experience should be able to master the materials in this course. "
                  points="30"
                />
                <RewardItem
                  listNumber="2"
                  title="Azure Credits"
                  description="Microsoft Azure is a cloud computing service operated by Microsoft for application management via Microsoft-managed data centers."
                  points="250"
                />
                 
                <RewardItem
                  listNumber="3"
                  title="Canva Pro Subscription"
                  description="Canva Pro is a graphic design platform, used to create social media graphics, presentations, posters, documents and other visual content. The app includes templates for users to use."
                  points="150"
                />
                 
                <RewardItem
                  listNumber="4"
                  title="Mentorship with an Expert"
                  description="Mentorship from people who have specific skills and knowledge. Participants in mentor programs share their values and personal goals in a mutually respectful, supportive way which leads to a more enriched life for both. The program will help break down barriers and create opportunities for success."
                  points="500"
                />
              </div>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
};

export default RewardPage;
