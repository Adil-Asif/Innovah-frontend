import React from "react";
import  "./Footer.scss";
import { Layout } from "antd";
import FooterLogo from "../../assests/Images/FooterLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright, faRegistered } from "@fortawesome/free-solid-svg-icons";

const { Footer } = Layout;

const CustomFooter = () => {
  return (
      <Footer className="footerLayout">
        <span className="logo">
          <img src={FooterLogo} alt="Innovah" />
          <FontAwesomeIcon icon={faRegistered} />
        </span>
        <FontAwesomeIcon icon={faCopyright} /> 2021 Created by Team Innovah
      </Footer>
  );
};

export default CustomFooter;
