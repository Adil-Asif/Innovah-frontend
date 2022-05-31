import { React, useState, useEffect } from "react";
import "./AddIdeaPage.scss";
import PageTitle from "../../components/PageTitle/PageTitle";
import { storage } from "../../services/Firebase/Firebase";
import {
  Layout,
  Form,
  Input,
  Button,
  Select,
  Switch,
  Upload,
  message,
} from "antd";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AddIdea from "../../assests/Images/AddIdea.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";
const { Content } = Layout;
const { Option } = Select;

const AddIdeaPage = () => {
  const [form] = Form.useForm();
  const innovahPoints = useSelector((state) => state.userDetails.innovahPoints);
  let idea = {
    ideaID: "",
    ideaTitle: "",
    ideaDescription: "",
    ideaDomain: "",
    ideaIndustry: "",
    ideaFinalDeliverables: "",
    ideaImage: "",
    ideaVisibility: "",
    isSubmit: false,
    innovahPoints: innovahPoints
  };
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [ideaDetails, setIdeaDetails] = useState(idea);

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
            // TODO: Reolve issue returns url on second submit look for solution. Issue with promise
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

    if (imageAsFile !== "") {
      handleFireBaseUpload();
    }
  }, [imageAsFile]);

  useEffect(() => {
    if (imageAsUrl.imgUrl !== "") {
      idea.ideaTitle = ideaDetails.ideaTitle;
      idea.ideaDescription = ideaDetails.ideaDescription;
      idea.ideaDomain = ideaDetails.ideaDomain.toString();
      idea.ideaDomain = idea.ideaDomain.replaceAll(",", ", ");
      idea.ideaIndustry = ideaDetails.ideaIndustry.toString();
      idea.innovahPoints =innovahPoints + 1000;
      idea.ideaVisibility = ideaDetails.ideaVisibility ? "private" : "public";
      idea.ideaFinalDeliverables = ideaDetails.ideaFinalDeliverables.toString();
      idea.ideaFinalDeliverables = idea.ideaFinalDeliverables.replaceAll(
        ",",
        ", "
      );
      idea.ideaImage = imageAsUrl.imgUrl;
      idea.isSubmit = true;
      console.log(ideaDetails);
      setIdeaDetails(idea);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageAsUrl]);
  const func = async (obj) => {
    await axios
      .post("https://innovah.herokuapp.com/ideas/addidea", obj)
      .then((result) => {
        console.log(result);
      });
  };
  useEffect(() => {
    if (ideaDetails.isSubmit) {
      console.log(ideaDetails);
      func(ideaDetails);
      form.resetFields();
      message.success("Idea Posted");
      // axios.post('https://innovah.herokuapp.com/ideas/addidea',ideaDetails)
      // .then((result)=>{
      //   console.log(result);
      // })

      // Post request for adding idea
    }
  }, [ideaDetails]);

  const onFinish = (values) => {
    idea = values;
    setIdeaDetails(idea);
    console.log(idea, "2");
    handleSubmission(idea.ideaImage);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleSubmission = async (ideaImage) => {
    setImageAsFile(ideaImage.file);
  };

  return (
    <div className="addIdeaPage">
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout className="site-layout" data-theme="dark">
          <Header />
          <Content style={{ margin: "0 16px" }}>
            <div className="titleSection">
              <div className="pageTitle">
                <PageTitle title="Add Idea" />
              </div>
              <img src={AddIdea} alt="Add Idea" />
            </div>
            <div className="addIdeaForm">
              <Form
                form={form}
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item label="Idea Title" name="ideaTitle" required>
                  <Input required />
                </Form.Item>
                <Form.Item label="Description" name="ideaDescription" required>
                  <Input required />
                </Form.Item>
                <Form.Item label="Domain" name="ideaDomain" required>
                  <Select
                    required
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select the relevant tags that belong to your idea"
                  >
                    <Option value="Web Development" label="WebDevelopment">
                      Web Development
                    </Option>
                    <Option value="App Development" label="AppDevelopment">
                      App Development
                    </Option>
                    <Option value="Data Science" label="DataScience">
                      Data Science
                    </Option>
                    <Option
                      value="Artifitial Intelligence"
                      label="ArtifitialIntelligence"
                    >
                      Artifitial Intelligence
                    </Option>
                    <Option value="Security" label="Security">
                      Security
                    </Option>
                    <Option value="Blockchain" label="Blockchain">
                      Blockchain
                    </Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Industry" name="ideaIndustry" required>
                  <Select
                    required
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select the relevant industry your idea belong to"
                  >
                    <Option value="Technology" label="Technology">
                      Technology
                    </Option>
                    <Option value="Health" label="Health">
                      Health
                    </Option>
                    <Option value="Environment" label="Environment">
                      Environment
                    </Option>
                    <Option value="Construction" label="Construction">
                      Construction
                    </Option>
                    <Option value="Tourism" label="Tourism">
                      Tourism
                    </Option>
                    <Option value="Food" label="Food">
                      Food
                    </Option>
                    <Option value="Other" label="Other">
                      Other
                    </Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Final Deliverables"
                  name="ideaFinalDeliverables"
                  required
                >
                  <Select
                    required
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select the relevant Final Deliverables you will provide"
                  >
                    <Option value="SRS" label="SRS">
                      SRS
                    </Option>
                    <Option value="SDS" label="SDS">
                      SDS
                    </Option>
                    <Option value="User Manual" label="UserManual">
                      User Manual
                    </Option>
                    <Option value="Product" label="Product">
                      Product
                    </Option>
                    <Option value="Testing Documents" label="TestingDocuments">
                      Testing Documents
                    </Option>
                    <Option value="Contracts" label="Contracts">
                      Contracts
                    </Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Attach Image" name="ideaImage" required>
                  <Upload.Dragger
                    required
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
                <Form.Item
                  label="Make Private"
                  valuePropName="checked"
                  name="ideaVisibility"
                >
                  <Switch />
                </Form.Item>
                <div className="submit">
                  <Button
                    type="primary"
                    style={{
                      borderRadius: "8px",
                    }}
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
};

export default AddIdeaPage;
