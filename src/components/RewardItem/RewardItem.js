import { React, useEffect, useState } from "react";
import "./RewardItem.scss";
import { Button, message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateRewards } from "../../Slice/initialiseUserDetailsSlice";

const RewardItem = (props) => {
  const role = "user";
  const [isClaimed, setIsClaimed] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isClaimed) {
      let totalPoints = props.totalInnovahPoints - props.points;
      if (totalPoints >= 0) {
        axios
          .post("https://innovah.herokuapp.com/Rewards/claimreward", {
            userrewardid: props.userrewardid,
            innovahPoints: totalPoints,
            userid: props.userid,
          })
          .then(() => {
            message.success("Reward Claimed");
            dispatch(
              updateRewards({
                innovahPoints: totalPoints,
              })
            );
            setIsClaimed(false);
            props.updatePoints();
          });
      } else {
        message.error("You are out of Innovah Points");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClaimed]);

  return (
    <>
      <div className="rewardItemLayout">
        <div className="left">
          <div className="listNumber"> {props.listNumber} </div>
          <div className="information">
            <div className="title">{props.title}</div>
            {props.isClaimed ? (
              <>
                <div className="description">{props.description}</div>
              </>
            ) : role === "admin" ? (
              <>
                <div className="description">{props.description}</div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="right">
          <div className="points">{props.points} IP</div>
          <div>
            {props.isClaimed ? (
              <>
                <div className="claimed">Claimed</div>
              </>
            ) : (
              <div className="userButton">
                <Button
                  type="primary"
                  shape="round"
                  onClick={() => {
                    setIsClaimed(true);
                  }}
                >
                  Claim
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default RewardItem;
