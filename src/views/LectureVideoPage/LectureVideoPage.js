import { React, useState, useEffect } from "react";
import "./LectureVideoPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Layout, Button, Spin } from "antd";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PageTitle from "../../components/PageTitle/PageTitle";
import lecture from "../../assests/Images/lecture.svg";
import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faArrowTurnDown,
} from "@fortawesome/free-solid-svg-icons";
const { Content } = Layout;

const LectureVideoPage = () => {
  const [params, setParams] = useState(useParams());
  const [videoDetails, setVideoDetails] = useState([]);
  // console.log(params);

  // var [Response, setResponse] = useState(null);
  // useEffect(() => {
  //   const responseFunction = async () => {
  //     var response = await axios.get(
  //       "http://localhost:5000/Learn/playlist/video"
  //     );
  //     setResponse(await response);
  //   };
  //   responseFunction();
  // }, []);
  // console.log(Response);

  useEffect(() => {
    axios
      .post("http://localhost:5000/Learn/playlist/video", {
        playlistid: params.playlistid,
        id: params.videoid,
      })
      .then((response) => {
        console.log(response.data, "h");
        setVideoDetails(response.data[0]);
      });
  }, []);
  let navigate = useNavigate();
  const movetoplaylist = (playlistid) => {
    navigate(`/learningresources/${playlistid}`);
  };
  return (
    <div className="lectureVideoPage">
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout className="site-layout" data-theme="dark">
          <Header />
          <Content style={{ margin: "0 16px" }}>
            <div className="titleSection">
              <div className="pageTitle">
                {/* <PageTitle title={Response.data.videotitle} /> */}
                <PageTitle title={videoDetails.videotitle} />
              </div>
              {/* ) : (
                <Spin />
              )} */}
              <img src={lecture} alt="Lecture" />
            </div>

            {/* {Response ? ( */}
            <div className="viewLecture">
              <div className="Video">
                {parse(String(videoDetails.videoiframe))}
              </div>
              <Button  type="primary" onClick={() =>{movetoplaylist(videoDetails.playlistid)}}>
                <FontAwesomeIcon icon={faArrowTurnDown} className="icon"/>
                Back to plalist</Button>
            </div>
            {/* ) : (
              <Spin />
            )} */}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
};

export default LectureVideoPage;
