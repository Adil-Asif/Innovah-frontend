import { React, useState, useEffect } from "react";
import "./AddRequest.scss";
import { storage } from "../../services/Firebase/Firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Input, Upload,message } from "antd";
import { useSelector } from "react-redux";
const { TextArea } = Input;

const AddRequest = () => {
  let request = {
    requestID: "",
    requestTitle: "",
    requestDescription: "",
    requestImage: "",
    isSubmit: false,
  };
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [requestDetails, setRequestDetails] = useState(request);

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
      request.requestImage = imageAsUrl.imgUrl;
      request.isSubmit = true;
      request.requestTitle = requestDetails.requestTitle;
      request.requestDescription = requestDetails.requestDescription;
      setRequestDetails(request);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageAsUrl]);

  useEffect(() => {
    if (requestDetails.isSubmit) {
      sendDataToDB(requestDetails)
      message.success("Request Posted");
      console.log(requestDetails);
    }
  }, [requestDetails]);
  const userId = useSelector(
    (state) => state.userDetails.userid
  )
console.log(userId)
  const sendDataToDB = async(object)=>{
  
let response = await fetch(
  
  `http://localhost:5000/requests/addnewrequest/${userId}`,
  {
    // Adding method type
    method: "POST",

    // Adding body or contents to send
    body: JSON.stringify(
      object
     
    ),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }
);
response = await response.json()
console.log(response)
  }
  const onFinish = (values) => {
    request = values;
    setRequestDetails(request);
    console.log(request, "2");
    handleSubmission(request.requestImage);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleSubmission = async (requestImage) => {
    setImageAsFile(requestImage.file);
  };

  return (
    <div className="addRequestItem">
      <Form
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
        <Form.Item label="Request Title" name="requestTitle" required>
          <Input
            required
            onChange={(e) => {
              console.log("Change:", e.target.value);
            }}
            placeholder="Enter Request Title"
            showCount
            maxLength={50}
          />
        </Form.Item>
        <Form.Item
          label="Request Description"
          name="requestDescription"
          required
        >
          <TextArea
            required
            showCount
            maxLength={5000}
            placeholder="Enter job criteria"
          />
        </Form.Item>
        <Form.Item label="Attach Image" name="requestImage" required>
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
            <Button icon={<FontAwesomeIcon icon={faUpload} className="icon" />}>
              Upload Image
            </Button>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item>
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
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddRequest;
