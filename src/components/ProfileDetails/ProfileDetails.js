import React from "react";

import "./ProfileDetails.scss";

const ProfileDetails = (props) => {
  return (
    <div className="profileDetailsLayout">
      {console.log(props.imageUrl)}
      <img src={props.imageUrl} alt={props.userName} />
      <div className="profileDetails">
      <div className="description">
          User Id: <span>{props.userID}</span>
        </div>
        <div className="description">
          User Name: <span>{props.userName}</span>
        </div>
        <div className="description">
          Industry: <span>{props.userIndustry}</span>
        </div>
        <div className="description">
          Role: <span>{props.userRole}</span>
        </div>
        <div className="description">
          Mobile Number: <span>{props.userMobileNumber}</span>
        </div>
        <div className="description">
         Innovah Point: <span>{props.innovahPoints}</span>
        </div>
      </div>
    </div>
  );
};
export default ProfileDetails;
