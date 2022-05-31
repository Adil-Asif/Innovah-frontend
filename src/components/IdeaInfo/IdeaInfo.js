import React from "react";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

import "./IdeaInfo.scss";

const IdeaInfo = (props) => {
  return (
    <div className="ideaInfoLayout">
      <img src={props.imageUrl} alt={props.ideaName} />
      <div className="ideaDetails">
        <div className="description">
          Idea Name: <span>{props.ideaName}</span>
        </div>
        <div className="description">
          Author: <span>{props.ideaAuthor}</span>
        </div>
        <div className="description">
          Industry: <span>{props.ideaindustry}</span>
        </div>
        <div className="description">
         Domain: <span>{props.domain}</span>
        </div>
        <div className="description">
          Status: <span>{props.ideaStatus}</span>
        </div>
        <div className="description">
          Visibility: <span>{props.ideaVisibility}</span>
        </div>
      </div>
    </div>
  );
};
export default IdeaInfo;
