import React, { Component } from "react";
import "./docs.scss";
import GoogleDrive from "../../assets/images/GoogleDrive.png";
import Lightbulb from "../../assets/images/Lightbulb.png";
import history from "../../assets/images/history.png";


export default class Docs extends Component {
  render() {
    return (
      <div className="main-container collapse-sidebar">
        <div className="sidebar">
          <ul className="sidenav">
            <li className="dashboard active"><a href="">Dashboard</a></li>
            <li className="files"><a href="">My Files</a></li>
            <li className="help"><a href="">Help</a></li>
            <li className="archive"><a href="">Archives</a></li>
          </ul>
        </div>
        <div className="main-content">
          <div className="row">
            <div className="col-sm-7 sidearea player-div">
              <div className="back">
                <a href=""><i className="fa fa-angle-left"></i></a>
              </div>
              <div className="player">

              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7 col-sm-12 sidearea">
              <div className="docs-wrapper">
                <h1>Untitled Document</h1>
                <a href="" className="dropToggle"><i className="fa fa-ellipsis-h"></i></a>
                <div className="timers">
                  <div className="timeline">
                    <span>00.42</span>Pain
                  </div>
                  <div className="timeline">
                    <span>03.12</span>Gain
                  </div>
                  <div className="timeline">
                    <span>11.54</span>Gain
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="quicktip greenbg">
                <a href="" className="close">x</a>
                <h4>Quick tips:</h4>
                <ul>
                  <li>-Ctrl+I adds italic formatting and Ctrl+B adds bold formatting</li>                  
                  <li>-Press ESC to play/pause, and Ctrl+j to insert the current timestamp </li>
                </ul>
              </div>
              <div className="quicktip">
                <a href="" className="close">x</a>
                <h4>Quick tips:</h4>
                <ul>
                  <li>-Ctrl+I adds italic formatting and Ctrl+B adds bold formatting</li>                  
                  <li>-Press ESC to play/pause, and Ctrl+j to insert the current timestamp </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2 col-sm-6 sharebox">
              <ul>
                <li>History <span><img src={history} alt="history" /></span></li>
                <li>Save to Google Drive <span><img src={GoogleDrive} alt="history" /></span></li>
                <li>Quick tips <span><img src={Lightbulb} alt="history" /></span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
