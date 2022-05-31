import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./IdeasItem.scss";
import { storage } from "../../services/Firebase/Firebase";
import { Button, Input, Upload, Modal, Form } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";
const { TextArea } = Input;

const IdeasItem = (props) => {
  let idea = {
    ideaid: props.ideaid,
    ideaName: props.ideaName,
    ideaDescription: props.description,
    ideaImage: props.imageUrl,
    isUpdated: false,
  };
  const userrole = useSelector((state) => state.userDetails.userrole);
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [ideaDetails, setIdeaDetails] = useState(idea);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isApproved, setISApproved] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isApproved) {
      //TODO: Handle Admin Approval
      console.log(isApproved);
      // fun must have obj as argument and obj must have ideaid
      axios
        .post(
          "https://innovah.herokuapp.com/ideas/myideas/globalidea/updatestatus",
          {ideaid: props.ideaid}
        )
        .then((result) => {
          console.log(result);
        });
    }
  }, [isApproved]);

  const handleSubmission = async (ideaImage) => {
    setImageAsFile(ideaImage.file);
  };

  let navigate = useNavigate();
  const moveToIdea = () => {
    navigate(`/myideas/${props.ideaid}`);
  };

  useEffect(() => {
    form.resetFields();
    setIsModalVisible(false);
  }, [ideaDetails, form]);

  useEffect(() => {
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
          .ref(`/images/${imageAsFile.name}`)
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
              .ref("images")
              .child(imageAsFile.name)
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
  }, [imageAsFile]);

  useEffect(() => {
    if (imageAsUrl.imgUrl !== "") {
      idea.ideaid = ideaDetails.ideaid;
      idea.ideaName = ideaDetails.ideaName;
      idea.ideaDescription = ideaDetails.ideaDescription;
      idea.ideaImage = imageAsUrl.imgUrl;
      idea.isUpdated = true;
      setIdeaDetails(idea);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageAsUrl]);

  useEffect(() => {
    if (ideaDetails.isUpdated) {
      console.log(ideaDetails);
      axios
        .post("https://innovah.herokuapp.com/ideas/myideas", ideaDetails)
        .then((result) => {
          console.log(result);
          idea = ideaDetails;
          idea.isUpdated = false;
          props.updateIdeas();
          setIdeaDetails(idea);
        });
      // Post request for updated idea details
    }
  }, [ideaDetails]);

  const onEdit = (values) => {
    console.log(ideaDetails, "h");
    idea.ideaImage =
      values.ideaImage !== undefined
        ? (values.ideaImage, handleSubmission(values.ideaImage))
        : ideaDetails.ideaImage;

    idea.ideaName =
      values.ideaName !== undefined ? values.ideaName : ideaDetails.ideaName;
    idea.ideaDescription =
      values.ideaDescription !== undefined
        ? values.ideaDescription
        : ideaDetails.ideaDescription;

    idea.ideaid = ideaDetails.ideaid;

    idea.isUpdated = true;
    setIdeaDetails(idea);
  };
  return (
    <div className="ideaItemLayout">
      <img src={props.imageUrl} alt={props.ideaName} />
      <div className="information">
        <div className="title">{props.ideaName}</div>
        <div className="description">{props.description}</div>
      </div>
      {props.global ? (
        userrole !== "Administrator" ? (
          <>
            <Button
              type="primary"
              className="viewBtn"
              onClick={() => {
                moveToIdea();
              }}
              style={{
                width: "100%",
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
              }}
            >
              View Item
            </Button>
          </>
        ) : props.isApproved ? (
          <>
            <div className="approved">Approved</div>
          </>
        ) : (
          <>
            {" "}
            <Button
              type="primary"
              className="approveBtn"
              style={{
                width: "100%",
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
              }}
              onClick={() => {
                setISApproved(true);
              }}
            >
              Approve
            </Button>
          </>
        )
      ) : (
        <>
          <Button
            type="primary"
            className="viewBtn"
            style={{ marginRight: "4%", borderBottomLeftRadius: "8px" }}
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            className="viewBtn"
            onClick={() => {
              moveToIdea();
            }}
            style={{
              borderBottomRightRadius: "8px",
            }}
          >
            View Item
          </Button>

          <Modal
            centered
            className="editIdeaModal"
            title={props.ideaName}
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
            <div className="editIdeaForm">
              <Form form={form}>
                <div>
                  <Form.Item
                    name="ideaName"
                    label="Idea Tile"
                    rules={[{ message: "Previous title will be used" }]}
                  >
                    <Input defaultValue={ideaDetails.ideaName} />
                  </Form.Item>
                  <Form.Item name="ideaDescription" label="Idea Description">
                    <TextArea
                      defaultValue={ideaDetails.ideaDescription}
                      showCount
                      maxLength={3000}
                    />
                  </Form.Item>
                  <Form.Item name="ideaImage">
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
                          <FontAwesomeIcon icon={faUpload} className="icon" />
                        }
                      >
                        Upload Image
                      </Button>
                    </Upload.Dragger>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default IdeasItem;
