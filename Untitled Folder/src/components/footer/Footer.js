import React from "react";
import "./footer.scss";

import chat from "../../assets/images/message_float.png";

const Footer = () => (
  <div className="chat-float">
    <a href=""> <img src={chat} alt="chat" /></a>
  </div>
);

export default Footer;
