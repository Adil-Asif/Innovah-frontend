import React, { useState } from "react";
import "./HomePage.scss";
import { Modal, Button, Form } from "antd";
import Input from "../../components/Input/Input";
import SignUpHeader from "../../components/SignUpHeader/SignUpHeader";
import CustomFooter from "../../components/Footer/Footer";
import idea_pitch from "../../assests/Images/HomepageImages/light-bulb.png";
import community from "../../assests/Images/HomepageImages/teamwork.png";
import training from "../../assests/Images/HomepageImages/analysis.png";
import projectManagement from "../../assests/Images/HomepageImages/project-management.png";
import competitons from "../../assests/Images/HomepageImages/problem.png";
import adil from "../../assests/Images/HomepageImages/Adil.jpg";
import hasaan from "../../assests/Images/HomepageImages/hasaan.png";
import rafay from "../../assests/Images/HomepageImages/rafay.png";
const HomePage = () => {
  return (
    <div className="homePage">
      <SignUpHeader />

      <div className="tagLines">
        <h3>Digital Incubation Platform</h3>
        <h3>Innovation we want, Let creativity soar</h3>
        <Button>
          {" "}
          <span className="start-Today"> Start Today </span>
        </Button>
      </div>
      <div className="innovah-tag">
        <div className="homepage-heading">What is Innovah?</div>
        <div className="homepage-content">
          Innovah is a business incubator platform for people who want to
          convert innovative ideas into products. It is a place for <br />{" "}
          enterprenues, innovators, freelancers, to work for a better future.
        </div>
      </div>

      <div className="innovah-tag">
        <div className="homepage-heading">What we offer?</div>
        <div className="homepage-content" id="homeImages">
          <div className="homepage-images">
            <img src={idea_pitch} alt="idea-Pitch" height="100px" />
            <br />
            <span className="image-text"> Idea Pitch </span>
          </div>
          <div className="homepage-images">
            <img src={community} alt="idea-Pitch" height="100px" />
            <br />
            <span className="image-text"> Community</span>
          </div>
          <div className="homepage-images">
            <img src={training} alt="idea-Pitch" height="100px" />
            <br />
            <span className="image-text"> Training </span>
          </div>
          <div className="homepage-images">
            <img src={projectManagement} alt="idea-Pitch" height="100px" />
            <br />
            <span className="image-text"> Project Management </span>
          </div>
          <div className="homepage-images">
            <img
              src={competitons}
              alt="idea-Pitch"
              height="80px"
              width="40px"
            />
            <br />
            <span className="image-text"> Competitons </span>
          </div>

          <div id="last-section" className="innovah-tag">
            <div id="team-heading" className="homepage-heading">
              Meet our Team
            </div>
            <div className="homepage-content">
              <div id="team-image" className="homepage-images">
                <img src={adil} alt="idea-Pitch" height="100px" />
                <br />
                <span className="image-text"> Adil Asif </span>
              </div>
              <div id="team-image" className="homepage-images">
                <img src={rafay} alt="idea-Pitch" height="100px" />
                <br />
                <span className="image-text"> Syed Abdurraffay </span>
              </div>

              <div id="team-image" className="homepage-images">
                <img src={hasaan} alt="idea-Pitch" height="100px" />
                <br />
                <span className="image-text"> Muhammad Hasaan </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixing-footer">
        <CustomFooter />
      </div>
    </div>
  );
};

export default HomePage;
