import { React, useState, useEffect } from "react";

import "./ViewIdeasPage.scss";
import { Layout, Row, Col, Avatar, Form, Input, Button, Image } from "antd";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import IdeaInfo from "../../components/IdeaInfo/IdeaInfo";
import emptyChat from "../../assests/Images/emptyChat.svg";
import IdeaInsight from "../../components/IdeaInsight/IdeaInsight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faSquareCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import Remarks from "../../components/Remarks/Remarks";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const { Content } = Layout;

const ViewIdeasPage = () => {
  // paste the code here
  // const ideaReview = (values) => {
  //   console.log(values);
  // };
  const [form] = Form.useForm();
  const [commentLength, setCommentLength] = useState(0);
  const username = useSelector((state) => state.userDetails.username);
  const picture = useSelector((state) => state.userDetails.picture);
  const ideaDetail = {
    comments: null,
    author: "",
    ideaDetails: {
      title: "",
      ideaindustry: "",
      domain: "",
      isapproved: "",
      visibility: "",
      image: "",
    },
  };
  const [ideaDetails, setIdeaDetails] = useState(ideaDetail);
  const [params, setParams] = useState(useParams());
  const [isUpdate, setIsUpdate] = useState(false);
  console.log(params);
  const [juryFeedback, setJuryFeedback] = useState("");

  const ideaReview = (values) => {
    console.log(values);
    setJuryFeedback({
      ideaid: params.ideaid,
      ideacomment: values.comment,
      commentby: username,
      imageUrl: picture,
    });
    form.resetFields();
  };

  useEffect(() => {
    axios
      .post("https://innovah.herokuapp.com/ideas/myideas/viewidea", {
        ideaid: params.ideaid,
      })
      .then((result) => {
        console.log(result);
        if (result.data.comments != null) {
          setCommentLength(result.data.comments);
        }
        setIdeaDetails(result.data);
      });
  }, [isUpdate]);

  useEffect(() => {
    if (juryFeedback !== "") {
      axios
        .post(
          "https://innovah.herokuapp.com/ideas/myideas/viewidea/juryresponse",
          juryFeedback
        )
        .then((result) => {
          console.log(result);
          if (isUpdate) {
            setIsUpdate(false);
          } else {
            setIsUpdate(true);
          }
        });
    }
  }, [juryFeedback]);

  return (
    <div className="viewIdeasPage">
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout className="site-layout" data-theme="dark">
          <Header />
          <Content style={{ margin: "0 16px" }}>
            <div className="insights">
              <Row gutter={32}>
                <Col className="gutter-row" span={6}>
                  <IdeaInfo
                    ideaName={ideaDetails.ideaDetails.title}
                    ideaAuthor={ideaDetails.author}
                    ideaindustry={ideaDetails.ideaDetails.ideaindustry}
                    domain={ideaDetails.ideaDetails.domain}
                    ideaStatus={
                      ideaDetails.ideaDetails.isapproved !== 0
                        ? "Approved"
                        : "Pending"
                    }
                    ideaVisibility={ideaDetails.ideaDetails.visibility}
                    imageUrl={ideaDetails.ideaDetails.image}
                  />
                </Col>
                <Col className="gutter-row rightSection" span={16}>
                  <Row gutter={32}>
                    <Col className="gutter-row ideaDescription" span={20}>
                      <IdeaInsight
                        icon={<FontAwesomeIcon icon={faFileLines} />}
                        description={ideaDetails.ideaDetails.description}
                        title="Description"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            {/* TODO: Convert it to role for jury and add comment option below */}
            <div className="feedback">
              <div className="title">Jury Remarks</div>

              <div className="comments">
                <div className="feedbackRow">
                  {ideaDetails.comments.length !== 0 ? (
                    ideaDetails.comments.map(
                      (commentDetails, i, commentLength) =>
                    
                        i + 1 !== commentLength.length ? (
                          
                          <>
                            <Remarks
                              name={commentDetails.commentby}
                              description={commentDetails.ideacomment}
                              imageUrl={commentDetails.imageUrl}
                            />
                            <hr className="hr"/>
                          </>
                        ) : (
                          console.log(commentLength.length),
                          <>
                            <Remarks
                              name={commentDetails.commentby}
                              description={commentDetails.ideacomment}
                              imageUrl={commentDetails.imageUrl}
                            />
                          </>
                        )
                    )
                  ) : (
                    <div className="Image">
                      <Image src={emptyChat} alt="empty chat" width={150} />
                    </div>
                  )}
                </div>

                <div className="response">
                  <div className="avatar">
                    <Avatar
                      shape="round"
                      size={50}
                      style={{
                        backgroundColor: "var(--primary-color)",
                        marginLeft: "10px",
                      }}
                    >
                      Jury
                    </Avatar>
                  </div>
                  <div className="responseForm">
                    <Form onFinish={ideaReview} form={form}>
                      <div>
                        <Form.Item name="comment">
                          <Input placeholder="Enter Your Response...." />
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item>
                          <Button
                            htmlType="submit"
                            icon={
                              <FontAwesomeIcon
                                icon={faSquareCaretRight}
                                className="icon"
                                style={{ fontSize: "34px" }}
                              />
                            }
                          ></Button>
                        </Form.Item>
                      </div>
                    </Form>
                  </div>
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

export default ViewIdeasPage;
