import { React, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  faCheckCircle,
  faCheck,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import "./LearningResource.scss";
import { Button } from "antd";
const LearningResourcesTitle1 = (props) => {
  const [updateIsEnrolled, setUpdateIsEnrolled] = useState(false);

  let navigate = useNavigate();
  const movetoplaylist = (playlistid) => {
    navigate(`/learningresources/${playlistid}`);
  };
  useEffect(() => {
    if (updateIsEnrolled) {
      axios
        .post("http://localhost:5000/Learn/", {
          playlistid: props.playlistId,
          trainerid: props.trainerid,
        })
        .then((response) => {
          console.log(response);
          if (props.isUpdate) {
            props.statusUpdate(false);
          } else {
            props.statusUpdate(true);
          }
        });
    }
  }, [updateIsEnrolled]);
  return (
    <div className="learningResourceItemLayout">
      <div className="serialNumber">{props.i}</div>

      <div className="playlistImage">
        <img src={props.imageUrl} alt={props.title} />
      </div>
      <div className="information">
        <div className="title">{props.title}</div>
        <div className="description">{props.description}</div>
      </div>

      {props.isenrolled ? (
        <>
          <Button
            className="viewButton"
            type="primary"
            shape="round"
            onClick={() => {
              movetoplaylist(props.playlistId);
            }}
          >
            View <FontAwesomeIcon icon={faAngleDoubleRight} className="" />
          </Button>
        </>
      ) : (
        <Button
          type="primary"
          shape="round"
          onClick={() => setUpdateIsEnrolled(true)}
        >
          Enroll Now <FontAwesomeIcon icon={faAngleDoubleRight} className="" />
        </Button>
      )}
    </div>
  );
};
export default LearningResourcesTitle1;
