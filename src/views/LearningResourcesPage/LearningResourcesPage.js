import { React, useEffect, useState } from "react";
import "./LearningResourcesPage.scss";
import { storage } from "../../services/Firebase/Firebase";
import { Layout, Button, Modal, Form, Input, Upload } from "antd";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PageTitle from "../../components/PageTitle/PageTitle";
import LearningResourcesItem from "../../components/LearningResource/LearningResource";
import LearningRescources from "../../assests/Images/LearningResources.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";
const { Content } = Layout;
const { TextArea } = Input;

const LearningResourcesPage = () => {
  let playlist = {
    trainerid: "",
    userid: "",
    playlistTitle: "",
    playlistDescription: "",
    playlistImage: "",
    isSubmitted: false, 
  };
  
  const [learningresourcesList, setLearningresourcesList] = useState([]);
  const [learnigResourceUpdate, setLearnigResourceUpdate] = useState([false]);
  const userrole = useSelector((state) => state.userDetails.userrole);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [playlistDetails, setPlaylistDetails] = useState(playlist);
  const userid = useSelector((state) => state.userDetails.userid);
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    setIsModalVisible(false);
  }, [playlistDetails, form]);

  useEffect(() => {
    const currentdate = new Date();
    const date =
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    const handleFireBaseUpload = () => {
      console.log("start of upload");
      // async magic goes here...
      console.log(imageAsFile);
      if (imageAsFile === "") {
        console.error(
          `not an image, the image file is a ${typeof imageAsFile}`
        );
      }

      if (imageAsFile !== undefined) {
        const uploadTask = storage
          .ref(`/images/learningresources/${userid}${date}${imageAsFile.name}`)
          .put(imageAsFile);
        //initiates the firebase side uploading
        uploadTask.on(
          "state_changed",
          (snapShot) => {
            //takes a snap shot of the process as it is happening
            console.log(snapShot);
          },
          (err) => {
            //catches the errors
            console.log(err);
          },
          () => {
            // gets the functions from storage refences the image storage in firebase by the children
            // gets the download url then sets the image from firebase as the value for the imgUrl key:
            storage
              .ref(`images/learningresources/`)
              .child(`${userid}${date}${imageAsFile.name}`)
              .getDownloadURL()
              .then(async (fireBaseUrl) => {
                if (fireBaseUrl !== "") {
                  setImageAsUrl((prevObject) => ({
                    ...prevObject,
                    imgUrl: fireBaseUrl,
                  }));
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        );
      }
    };
    const funct = () => {
      if (imageAsFile !== "") {
        handleFireBaseUpload();
      }
    };
    funct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageAsFile]);

  useEffect(() => {
    if (imageAsUrl.imgUrl !== "") {
      playlist.playlistTitle = playlistDetails.playlistTitle;
      playlist.playlistDescription = playlistDetails.playlistDescription;
      playlist.playlistImage = imageAsUrl.imgUrl;
      playlist.isSubmitted = true;
      setPlaylistDetails(playlist);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageAsUrl]);


const updateStatus = (data) =>
{
  setLearnigResourceUpdate()
}


  useEffect(() => {
    axios.get("https://innovah.herokuapp.com/Learn/").then((response) => {
      console.log(response);
      setLearningresourcesList(response.data);
    });
  }, [learnigResourceUpdate]);
  useEffect(() => {
    if (playlistDetails.isSubmitted) {
      // TODO: handle post request
      axios
        .post("https://innovah.herokuapp.com/Learn/addingplaylist/", {
          trainerid: userid,
          playlistname: playlistDetails.playlistTitle,
          description: playlistDetails.playlistDescription,
          pic: playlistDetails.playlistImage,
        })
        .then((response) => {
          console.log(response);
          if (learnigResourceUpdate) {
            setLearnigResourceUpdate(false);
          } else {
            setLearnigResourceUpdate(true);
          }
        });
      console.log(playlistDetails);
      // func(playlistDetails);
    }
  }, [playlistDetails]);

  const onSubmit = (values) => {
    playlist = values;
    setPlaylistDetails(playlist);
    handleSubmission(values.playlistImage);
  };
  const handleSubmission = (playlistImage) => {
    setImageAsFile(playlistImage.file);
  };

  return (
    <div className="learningResourcesPage">
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout className="site-layout" data-theme="dark">
          <Header />
          <Content style={{ margin: "0 16px 60px 0px" }}>
            <div className="titleSection">
              <div>
                <div className="pageTitle">
                  <PageTitle title="Learning Resources" />
                </div>
                {userrole === "Trainer" || userrole ==="Administrator" ? (
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
                        Add Playlist
                      </Button>
                    </div>
                    <Modal
                      centered
                      title="Add Playlist"
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
                      className="addPlaylistForm"
                    >
                      <div className="playlistForm">
                        <Form form={form}>
                          <Form.Item
                            name="playlistTitle"
                            label="Playlist Tile"
                            rules={[
                              {
                                required: true,
                                message: "Please enter playlist title",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter Playlist Title"
                              showCount
                            />
                          </Form.Item>
                          <Form.Item
                            name="playlistDescription"
                            label="Playlist Description"
                            rules={[
                              {
                                required: true,
                                message: "Please enter playlist description",
                              },
                            ]}
                          >
                            <TextArea showCount maxLength={5000} />
                          </Form.Item>
                          <Form.Item name="playlistImage">
                            <Upload.Dragger
                              listType="picture"
                              accept=".png,.jpg"
                              defaultFileList={""}
                              beforeUpload={(file) => {
                                console.log({ file });
                                return false;
                              }}
                              action={"/"}
                            >
                              <Button
                                icon={
                                  <FontAwesomeIcon
                                    icon={faUpload}
                                    className="icon"
                                  />
                                }
                              >
                                Upload Image
                              </Button>
                            </Upload.Dragger>
                          </Form.Item>
                        </Form>
                      </div>
                    </Modal>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <img src={LearningRescources} alt="Learning Resources" />
            </div>

            <div className="resources">
              {learningresourcesList.map((resourceItem, i) => (
                <LearningResourcesItem
                  i = {i+1}
                  isUpdate = {learnigResourceUpdate}
                  statusUpdate = {updateStatus}
                  title={resourceItem.title}
                  description={resourceItem.description}
                  imageUrl={resourceItem.imageurl}
                  playlistId={resourceItem.playlistid}
                  trainerid={resourceItem.trainerid}
                  className="resourceItem"
                  isenrolled={resourceItem.enrolledstatus}
                  iscompleted={resourceItem.completedstatus}
                />
              ))}
            </div>  
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
};

export default LearningResourcesPage;
