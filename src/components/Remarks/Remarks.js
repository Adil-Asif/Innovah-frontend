import React from "react";
import "./Remarks.scss"
import { Avatar } from 'antd';
const Remarks = (props) => {
  return (
    <div className="remarksItemLayout">
      <div className="avatar">
      <Avatar shape="round" size={70} src={props.imageUrl} /> 
      </div>
      <div className="juryFeedback">
        <div className="userName">{props.name}</div>
        <div className="review">{props.description}</div>
      </div>
    </div>
  );
};
export default Remarks;
