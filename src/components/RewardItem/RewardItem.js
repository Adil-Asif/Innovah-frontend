import { React, useEffect, useState } from "react";
import "./RewardItem.scss";
import { Button, Modal, Input, Form, InputNumber } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
const { TextArea } = Input;
const RewardItem = (props) => {
  // let reward = {
  //   rewardID: "",
  //   rewardTitle: props.title,
  //   rewardDescription: props.description,
  //   rewardPoints: props.points,
  //   isUpdated: false,
  // };
  const role = "user";
  const [isClaimed, setIsClaimed] = useState(false);

  // const [rewardDetails, setRewardDetails] = useState(reward);
  const [isDelete, setIsDelete] = useState(false);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [form] = Form.useForm();

  // useEffect(() => {
  //   if (rewardDetails.isUpdated) {
  //     form.resetFields();
  //     setIsModalVisible(false);
  //     console.log(rewardDetails);
  //   }
  // }, [rewardDetails, form]);

  // const onEdit = (values) => {
  //   reward.rewardTitle =
  //     values.rewardTitle !== undefined
  //       ? values.rewardTitle
  //       : rewardDetails.rewardTitle;
  //   reward.rewardDescription =
  //     values.rewardDescription !== undefined
  //       ? values.rewardDescription
  //       : rewardDetails.rewardDescription;
  //   reward.rewardPoints =
  //     values.rewardPoints !== undefined
  //       ? values.rewardPoints
  //       : rewardDetails.rewardPoints;
  //   reward.isUpdated = true;
  //   setRewardDetails(reward);
  // };

  return (
    <>
      {!isDelete ? (
        <>
          <div className="rewardItemLayout">
            <div className="left">
              <div className="listNumber"> {props.listNumber} </div>
              <div className="information">
                <div className="title">{props.title}</div>
                {isClaimed ? (
                  <>
                    <div className="description">{props.description}</div>
                  </>
                ) : role === "admin" ? (
                  <>
                    <div className="description">{props.description}</div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="right">
              {role !== "admin" ? (
                <>
                  <div className="points">{props.points} IP</div>
                  <div>
                    {isClaimed ? (
                      <>
                        <div className="claimed">Claimed</div>
                      </>
                    ) : (
                      <div className="userButton">
                        <Button
                          type="primary"
                          shape="round"
                          onClick={() => {
                            setIsClaimed(true);
                          }}
                        >
                          Claim
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* <Modal
                    centered
                    className="editRewardModal"
                    title={props.title}
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
                          onEdit(values);
                        })
                        .catch((info) => {
                          console.log("Validate Failed:", info);
                        });
                    }}
                  >
                    <div className="editRewardForm">
                      <Form form={form}>
                        <div>
                          <Form.Item name="rewardTitle" label="Reward Tile">
                            <Input defaultValue={rewardDetails.rewardTitle} />
                          </Form.Item>
                          <Form.Item
                            name="rewardDescription"
                            label="Reward Description"
                          >
                            <TextArea
                              defaultValue={rewardDetails.rewardDescription}
                              showCount
                              maxLength={3000}
                            />
                          </Form.Item>
                          <div className="rewardPoints">
                            <Form.Item
                              name="rewardPoints"
                              label="Reward Points"
                            >
                              <InputNumber
                                defaultValue={rewardDetails.rewardPoints}
                              />
                            </Form.Item>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </Modal>
                  <div className="adminButton">
                    <Button
                      type="primary"
                      shape="round"
                      className="editbtn"
                      onClick={() => {
                        setIsModalVisible(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button> */}
                  <div className="adminButton">
                    <Button
                      className="deletebtn"
                      type="primary"
                      shape="round"
                      onClick={() => {
                        setIsDelete(true);
                        console.log(isDelete);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default RewardItem;
