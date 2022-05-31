import { React, useState, useEffect } from "react";
import SignUpHeaderDetails from "../../components/SignupDetailsHeader/SignUpHeader";
import "./SignUp.scss";
import { useNavigate } from "react-router-dom";
import { storage } from "../../services/Firebase/Firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { resetRegistrationDetails } from "../../Slice/registerUserSlice";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer/Footer";
// import Input from "../../components/Input/Input";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  InputNumber,
  Anchor,
  Checkbox,
  message,
} from "antd";
import { Layout } from "antd";
import axios from "axios";
const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;
const { Link } = Anchor;
const SignUp = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const moveToHomePage = () => {
    navigate("/");
  };//////////
  const registrationEmail = useSelector(
    (state) => state.registrationDetails.useremail
  );
  const registrationPassword = useSelector(
    (state) => state.registrationDetails.userpassword
  );
  console.log(registrationEmail, registrationPassword, "h");

  let registerAccount = {
    username: "",
    city: "",
    gender: "",
    picture: "",
    industry: "",
    country: "Pakistan",
    mobilenumber: "",
    resume: "",
    userrole: "",
    email: registrationEmail,
    password: registrationPassword,
    fullname: "",
    isSubmit: false,
  };
  const [accountDetails, setAccountDetails] = useState(registerAccount);

  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

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
          .ref(`/images/profileImage/${registrationEmail}-${imageAsFile.name}`)
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
              .ref(`/images/profileImage/`)
              .child(`${registrationEmail}-${imageAsFile.name}`)
              .getDownloadURL()
              .then(async (fireBaseUrl) => {
                if (fireBaseUrl !== "") {
                  // console.log(fireBaseUrl);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageAsFile]);

  useEffect(() => {
    if (imageAsUrl.imgUrl !== "") {
      registerAccount.username = accountDetails.username;
      registerAccount.city = accountDetails.city;
      registerAccount.gender = accountDetails.gender;
      registerAccount.industry = accountDetails.industry;
      registerAccount.mobilenumber = accountDetails.mobilenumber;
      registerAccount.resume = accountDetails.resume;
      registerAccount.userrole = accountDetails.userrole;
      registerAccount.country = "Pakistan";
      registerAccount.email = registrationEmail;
      registerAccount.password = registrationPassword;
      registerAccount.fullname = accountDetails.username;
      registerAccount.isSubmit = true;
      registerAccount.picture = imageAsUrl.imgUrl;
      setAccountDetails(registerAccount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageAsUrl]);

  useEffect(() => {
    console.log(accountDetails);
    if (accountDetails.isSubmit) {
      console.log(accountDetails);
      axios
        .post("http://localhost:5000/Login/signup", { accountDetails })
        .then((result) => {
          console.log(result, "2");
          if (result.data === "Error") {
              message.error("Account already registered with this email")
          }
          moveToHomePage();
          dispatch(resetRegistrationDetails()); 
        });
      // dispatch(resetRegistrationDetails());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountDetails]);

  const onFinish = (values) => {
    // TODO: Value is erasing details that are not part of form so need to handle this
    registerAccount = values;
    console.log(values);
    setAccountDetails(registerAccount);
    handleSubmission(registerAccount.picture);
  };

  const handleSubmission = (profileImage) => {
    setImageAsFile(profileImage.file);
  };

  return (
    <div className="signUp">
      <Layout style={{ minHeight: "100vh" }}>
        <SignUpHeaderDetails />
        <Layout className="site-layout" data-theme="dark">
          <Content style={{ margin: "0 16px" }}>
            <div className="main-container">
              <div className="details-heading">
                Please Provide the Following Informartion
              </div>

              <div className="getting-input-container">
                <Form layout="horizontal" onFinish={onFinish}>
                  <Form.Item name="username" label="User name" required>
                    <Input placeholder="Enter User name" required />
                  </Form.Item>
                  <Form.Item required name="city" label="City">
                    <Input placeholder="Enter City" required />
                  </Form.Item>
                  <Form.Item required name="mobilenumber" label="Mobile Number">
                    <InputNumber placeholder="Enter Mobile Number" required />
                  </Form.Item>
                  <Form.Item label="Gender" name="gender" required>
                    <Select
                      allowClear
                      placeholder="Select your gender"
                      required
                    >
                      <Option value="Male" label="Male">
                        Male
                      </Option>
                      <Option value="demo" label="Female">
                        Female
                      </Option>
                      <Option value="Prefer not say" label="Prefer not say">
                        Prefer not say
                      </Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Industry" name="industry" required>
                    <Select
                      required
                      allowClear
                      placeholder="Please select the relevant industry of your expertise"
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
                  <Form.Item label="Role" name="userrole" required>
                    <Select allowClear placeholder="Select your role" required>
                      <Option value="Trainer" label="Trainer">
                        Trainer
                      </Option>
                      <Option value="Investor" label="Investor">
                        Investor
                      </Option>
                      <Option value="Administrator" label="Administrator">
                        Administrator
                      </Option>
                      <Option value="Mentor" label="Mentor">
                        Mentor
                      </Option>
                      <Option value="Jury" label="Jury">
                        Jury
                      </Option>
                      <Option value="Innovator" label="Innovator">
                        Innovator
                      </Option>
                    </Select>
                  </Form.Item>
                  <Form.Item required label="Resume" name="resume">
                    <TextArea
                      placeholder="Enter your relevant experince in the market in accordance to your role"
                      required
                    />
                  </Form.Item>
                  <Form.Item label="Attach Image" name="picture" required>
                    <Upload.Dragger
                      required
                      listType="picture"
                      accept=".png,.jpg"
                      defaultFileList={""}
                      beforeUpload={(file) => {
                        console.log({ file });
                        return false;
                      }}
                      action={"localhost:3000/"}
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

                  <div className="form-instruction">
                    <Form.Item>
                      <Checkbox style={{ marginRight: "10px" }} required />
                      Team Innovah has the right to decline your Account
                      Creation Request If your details do not meet our criteria.{" "}
                      <br />
                      Do you accept the
                      <Anchor affix={false} style={{ display: "inline-block" }}>
                        <Link
                          href="#components-anchor-demo-basic"
                          title="Terms and Conditions"
                        />
                      </Anchor>
                      ?
                    </Form.Item>
                  </div>
                  <Form.Item>
                    <div className="buttons">
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
};

export default SignUp;
