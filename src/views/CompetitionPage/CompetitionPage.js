import React from "react";
import "./CompetitionPage.scss";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Layout, Button, Spin, Modal, Form, Input } from "antd";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Competition from "../../assests/Images/competition.svg";
import InnovahCup from "../../assests/Images/InnovahCup.svg";
import hackathon from "../../assests/Images/hackathon.svg";
import defend from "../../assests/Images/defend.svg";
import { useState, useEffect } from "react";
const { TextArea } = Input;
const { Content } = Layout;

const CompetitionPage = () => {
  const { form } = Form;
  const competitionRules = {
    description:
      "Teams will be judged on these four criteria. Judges will weigh the criteria equally. During judging, participants should try to describe what they did for each criterion in their project.",
    criteria: {
      rule1: {
        title: "Creativity: ",
        description:
          "Is this project unique and innovative? Is it a solution or creation we have never seen before? A better way of doing something?",
      },
      rule2: {
        title: "Design: ",
        description:
          "Is this project easy to understand? Is it user-friendly to use?",
      },
      rule3: {
        title: "Completion: ",
        description:
          "Does the hack work? Did the team achieve everything they wanted?",
      },
      rule4: {
        title: "Applicability: ",
        description:
          "How much applicable is the project with the track? Have they used the product extensively?",
      },
    },
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [competitionDetails, setCompetitionDetails] = useState({
    rules: competitionRules,
  });
  const onSubmit = (values) => {
    console.log(values);
  };
  useEffect(() => {
    if (showModal) {
      console.log(competitionDetails);
      setIsModalVisible(true);
      setShowModal(false);
    }
  }, [competitionDetails]);
  return (
    <div className="competitionPage">
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout className="site-layout" data-theme="dark">
          <Header />
          <Content style={{ margin: "0 16px" }}>
            <div className="titleSection">
              <div className="pageTitle">
                <PageTitle title="Competitions" />
              </div>
              <img src={Competition} alt="Competitions" />
            </div>
            <div className="ideaItemsDashboard">
              <div className="competition">
                <div className="left">
                  <div className="image">
                    <img src={hackathon} alt="Hackathon" />
                  </div>
                  <div className="information">
                    <div className="title">Idea Hack</div>
                    <div className="description">
                      There is no question that hackathons have taken the world
                      by storm, spurring the development of everyday products
                      and moving millions of dollars. And with the rise of
                      hackathons, team Innovah has decided to arrange a
                      hackathon know as Idea Hack.Idea Hack is an event designed
                      to use technology, primarily coding, to accomplish an
                      objective.
                    </div>
                  </div>
                </div>
                <div className="right">
                  <div className="difficultyLevel">
                    <div className="difficultyTitle">Low</div>
                    <div
                      style={{
                        width: "150px",
                        border: "1px solid var(--textbox-border)",
                        borderRadius: "16px",
                      }}
                    >
                      <span
                        style={{
                          Width: "29px",
                          padding: "3px 37px",
                          backgroundColor: "yellow",
                          borderTopLeftRadius: "16px",
                          borderBottomLeftRadius: "16px",
                        }}
                      ></span>
                    </div>
                    <div className="difficultyTitle">High</div>
                  </div>
                  <div>
                    <Button
                      type="primary"
                      className="left"
                      shape="round"
                      style={{
                        width: "100%",
                      }}
                      onClick={() => {
                        setCompetitionDetails({
                          competition: "Idea Hack",
                          question:
                            "You are required to define your problem statement, your competitiors in the market and your proposed solution",
                          rules: competitionRules,
                        });
                        setShowModal(true);
                      }}
                    >
                      Participate
                    </Button>
                  </div>
                </div>
              </div>
              <div className="competition" style={{ marginTop: "40px" }}>
                <div className="left">
                  <div className="image">
                    <img src={InnovahCup} alt="Innovah Cup" />
                  </div>
                  <div className="information">
                    <div className="title">Innovah Cup</div>
                    <div className="description">
                      Innovah Cup is an annual competition sponsored and hosted
                      by Innovah Corp. which brings together student developers
                      worldwide to help resolve some of the world's toughest
                      challenges.
                    </div>
                  </div>
                </div>
                <div className="right">
                  <div className="difficultyLevel">
                    <div className="difficultyTitle">Low</div>
                    <div
                      style={{
                        width: "150px",
                        border: "1px solid var(--textbox-border)",
                        borderRadius: "16px",
                      }}
                    >
                      <span
                        style={{
                          Width: "25px",
                          padding: "4px 75px",
                          backgroundColor: "red",
                          borderRadius: "16px",
                        }}
                      ></span>
                    </div>
                    <div className="difficultyTitle">High</div>
                  </div>
                  <div>
                    <Button
                      type="primary"
                      className="left"
                      shape="round"
                      style={{
                        width: "100%",
                      }}
                      onClick={() => {
                        setCompetitionDetails({
                          competition: "Innovah Cup",
                          question:
                            "How can we develop financial wellbeingsolution to help vulnerable persons (e.g.,individuals suffering from mental health conditions and individuals who come from low-income families) to manage their money better during a pandemic or global crisis?",
                          rules: competitionRules,
                        });
                        setShowModal(true);
                      }}
                    >
                      Participate
                    </Button>
                  </div>
                </div>
              </div>
              <div className="competition" style={{ marginTop: "40px" }}>
                <div className="left">
                  <div className="image">
                    <img src={defend} alt="Proposal Defence" />
                  </div>
                  <div className="information">
                    <div className="title">Proposal Defence</div>
                    <div className="description">
                      The competition aims to assure that the plan candidate has
                      proposed for a product is complete and provide value to
                      the industry. Candidates will work closely on this
                      proposal to ensure that they present a unique product. The
                      winners of this competition will get direct mentorship
                      from team Innovah
                    </div>
                  </div>
                </div>
                <div className="right">
                  <div className="difficultyLevel">
                    <div className="difficultyTitle">Low</div>
                    <div
                      style={{
                        width: "150px",
                        border: "1px solid var(--textbox-border)",
                        borderRadius: "16px",
                      }}
                    >
                      <span
                        style={{
                          Width: "25px",
                          padding: "4px 30px",
                          backgroundColor: "green",
                          borderTopLeftRadius: "16px",
                          borderBottomLeftRadius: "16px",
                        }}
                      ></span>
                    </div>
                    <div className="difficultyTitle">High</div>
                  </div>
                  <div>
                    <Button
                      type="primary"
                      className="left"
                      shape="round"
                      style={{
                        width: "100%",
                      }}
                      onClick={() => {
                        setCompetitionDetails({
                          competition: "Proposal Defence",
                          question:
                            "You have to devise a solution related to health industry, or fintech industry, or automotive industry",
                          rules: competitionRules,
                        });
                        setShowModal(true);
                      }}
                    >
                      Participate
                    </Button>
                  </div>
                </div>
              </div>
              <Modal
                centered
                title={competitionDetails.competition}
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
                className="addCompetitionForm"
              >
                <div className="competitionForm">
                  <Form form={form}>
                    <div className="questions">
                      <h3>Question</h3>
                      <p>{competitionDetails.question}</p>
                    </div>
                    <div className="rules">
                      <h3>Criteria</h3>
                      {competitionDetails.rules.description}
                      <ol style={{ marginTop: "10px" }}>
                        <li>
                          <h4 style={{ display: "inline-block" }}>
                            {" "}
                            &nbsp;
                            {competitionDetails.rules.criteria.rule1.title}{" "}
                            &nbsp;
                          </h4>
                          {competitionDetails.rules.criteria.rule1.description}
                        </li>
                        <li>
                          <h4 style={{ display: "inline-block" }}>
                            {" "}
                            &nbsp;
                            {competitionDetails.rules.criteria.rule2.title}{" "}
                            &nbsp;
                          </h4>
                          {competitionDetails.rules.criteria.rule2.description}
                        </li>
                        <li>
                          <h4 style={{ display: "inline-block" }}>
                            {" "}
                            &nbsp;
                            {competitionDetails.rules.criteria.rule3.title}{" "}
                            &nbsp;
                          </h4>
                          {competitionDetails.rules.criteria.rule3.description}
                        </li>
                        <li>
                          <h4 style={{ display: "inline-block" }}>
                            {" "}
                            &nbsp;
                            {competitionDetails.rules.criteria.rule4.title}{" "}
                            &nbsp;
                          </h4>
                          {competitionDetails.rules.criteria.rule4.description}
                        </li>
                      </ol>
                    </div>

                    <Form.Item
                      name="submission"
                      rules={[
                        {
                          required: true,
                          message: "Please enter playlist description",
                        },
                      ]}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TextArea
                        showCount
                        maxLength={3000}
                        placeholder="Enter Your Solution"
                      />
                    </Form.Item>
                  </Form>
                </div>
              </Modal>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
};

export default CompetitionPage;
