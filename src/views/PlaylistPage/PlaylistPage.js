import React from "react";
import "./PlaylistPage.scss";
import { Layout, Spin, Button, Modal, Form, Input, message } from "antd";

import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PageTitle from "../../components/PageTitle/PageTitle";
import playlist from "../../assests/Images/Playlist.svg";
import playlistItem from "../../components/Playlist/PlaylistItem";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import PlaylistItem from "../../components/Playlist/PlaylistItem";
const { Content } = Layout;
const { TextArea } = Input;

const PLayListPage = () => {
  const [params, setParams] = useState(useParams());
  console.log(params);
  let video = {
    videoTitle: "",
    videoDescription: "",
    videoiframe: "",
    isSubmitted: false,
  };

  const userRole = "trainer";
  const [isUpdate, setIsUpdate] = useState(true);
  const [title, setTitle] = useState("");
  const [videolist, setVideoList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videoDetails, setvideoDetails] = useState(video);

  const [form] = Form.useForm();

  useEffect(() => {
    if (videoDetails.isSubmitted) {
      console.log(videoDetails);
      axios
        .post("http://localhost:5000/Learn/addingvideo", {
          playlistid: params.playlistid,
          description: videoDetails.videoDescription,
          videoiframe: videoDetails.videoiframe,
          videotitle: videoDetails.videoTitle,
        })
        .then((response) => {
          console.log(response);

          message.success("Video Uploaded");
          if (isUpdate) {
            setIsUpdate(false);
          } else {
            setIsUpdate(true);
          }
        });
    }
  }, [videoDetails]);

  const onSubmit = (values) => {
    video = values;
    setIsModalVisible(false);
    video.isSubmitted = true;
    setvideoDetails(video);
  };

  useEffect(() => {
    axios
      .post("http://localhost:5000/Learn/playlist", {
        playlistid: params.playlistid,
      })
      .then((response) => {
        console.log(response);
        setTitle(response.data[1].title);
        setVideoList(response.data[0]);
      });
  }, [isUpdate]);

  return (
    <div className="playListPage">
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout className="site-layout" data-theme="dark">
          <Header />
          <Content style={{ margin: "0 16px 60px 16px" }}>
            <div className="titleSection">
              {/* {Response?*/}
              <div>
                <div className="pageTitle">
                  <PageTitle title={title} />
                </div>
                {userRole === "trainer" ? (
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
                        Add Video
                      </Button>
                    </div>
                    <Modal
                      centered
                      title="Add Video"
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
                      className="addVideoForm"
                    >
                      <div className="videoForm">
                        <Form form={form}>
                          <div>
                            <h3>Instructions</h3>
                            <ul>
                              <li>Video Title</li>
                              <li>Brief description about the video</li>
                              <li>Upload the video on youtube</li>
                              <li>
                                Submit the iframe pf the video in this form
                              </li>
                              <li>
                                Monthly remuneration till project completion
                              </li>
                            </ul>
                          </div>
                          <Form.Item
                            name="videoTitle"
                            label="Video Tile"
                            rules={[
                              {
                                required: true,
                                message: "Please enter video title",
                              },
                            ]}
                          >
                            <Input placeholder="Enter Video Title" />
                          </Form.Item>
                          <Form.Item
                            name="videoDescription"
                            label="Video Description"
                            rules={[
                              {
                                required: true,
                                message: "Please enter video description",
                              },
                            ]}
                          >
                            <TextArea showCount maxLength={3000} />
                          </Form.Item>
                          <Form.Item
                            name="videoiframe"
                            label="Video iframe"
                            rules={[
                              {
                                required: true,
                                message: "Please enter video iframe",
                              },
                            ]}
                          >
                            <Input placeholder="Enter Video iframe" />
                          </Form.Item>
                        </Form>
                      </div>
                    </Modal>
                  </>
                ) : (
                  <></>
                )}
              </div>
              {/* :<Spin/>} */}
              <img src={playlist} alt="video" />
            </div>
            <div className="lectures">
              <div className="lectureItem">
                {videolist.map((videoItem, i, videolist) =>
                  i + 1 !== videolist.length ? (
                    <>
                      <PlaylistItem
                        id={videoItem.id}
                        title={videoItem.videotitle}
                        description={videoItem.description}
                        className="lectureItem"
                        playlistid={videoItem.playlistid}
                        i={i + 1}
                      />
                      <hr
                        style={{
                          marginLeft: "-12px",
                          marginRight: "-12px",
                          height: "1px",
                          borderRadius: "0",
                          backgroundColor: "var(-textbox-border)",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <PlaylistItem
                        id={videoItem.id}
                        title={videoItem.videotitle}
                        description={videoItem.description}
                        className="lectureItem"
                        playlistid={videoItem.playlistid}
                        i={i + 1}
                      />
                    </>
                  )
                )}
              </div>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
};

export default PLayListPage;
