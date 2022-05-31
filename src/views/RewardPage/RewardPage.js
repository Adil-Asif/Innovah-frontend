import { React, useState, useEffect } from "react";
import "./RewardPage.scss";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Layout, Button, Modal, Form, Input, InputNumber, message } from "antd";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import RewardItem from "../../components/RewardItem/RewardItem";
import RewardImage from "../../assests/Images/Rewards.svg";
import { useSelector } from "react-redux";
import axios from "axios";
const { Content } = Layout;
const { TextArea } = Input;

const RewardPage = () => {
  
  const userid = useSelector((state) => state.userDetails.userid);
  const innovahPoints = useSelector((state) => state.userDetails.innovahPoints);
  const userrole = useSelector((state) => state.userDetails.userrole);
  const [rewardList, setRewardList] = useState([]);
  const [rewardItem, setRewardItem] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isupdate, setIsUpdate] = useState(true);
  const [form] = Form.useForm();

  const updatePoints = () =>{
    if(isupdate)
    {
      setIsUpdate(false);
    }
    else{
      setIsUpdate(true)
    }
  }

  useEffect(() => {
    axios
      .get("https://innovah.herokuapp.com/Rewards/", { params: { userid: userid } })
      .then((response) => {
        console.log(response);
        setRewardList(response.data);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isupdate]);

  useEffect(() => {
    if (rewardItem !== "") {
      axios
        .post("https://innovah.herokuapp.com/Rewards/postreward", {
          rewardTitle: rewardItem.rewardTitle,
          rewardDescription: rewardItem.rewardDescription,
          rewardPoints: rewardItem.rewardPoints,
        })
        .then(() => {
          message.success("Reward Added");
        });
    }
  }, [rewardItem]);

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
                      Your IP Points: <span className="points">{innovahPoints}</span>
                    </div>
                  </>
                )}
              </div>
              <img src={RewardImage} alt="Reward Shop" />
            </div>
            <div className="rewardItemContainer">
              <div className="rewardItem">
                {rewardList.map((rewardDetails, i) => (
                  <RewardItem
                    rewardid={rewardDetails.rewardid}
                    userrewardid={rewardDetails.userrewardid}
                    listNumber={i + 1}
                    title={rewardDetails.rewardTitle}
                    description={rewardDetails.rewardDescription}
                    points={rewardDetails.rewardPoints}
                    totalInnovahPoints={innovahPoints}
                    userid ={rewardDetails.userid}
                    isClaimed = {rewardDetails.claimStatus}
                    updatePoints = {updatePoints}
                  />
                ))}
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
