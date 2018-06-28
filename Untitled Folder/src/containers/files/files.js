import React, { Component } from "react";
import "./files.scss";
import docs from "../../assets/images/moments1.png";
import tags from "../../assets/images/TagsIcon.png";
import moments from "../../assets/images/moments.png";
import proicon from "../../assets/images/profile.png";
import tagscloud from "../../assets/images/Bitmap.png";


export default class Files extends Component {
  render() {
    return (
      <div className="main-container">
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
            <div className="col-sm-12">
              <h2>FileName User Research Synthesis</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-8 text-center">
              <div className="googlesheet-wrap">
                <label>Open with GoogleSheets</label>
              </div>
            </div>
            <div className="offset-md-1 col-md-3 col-sm-4 right-sidebar">
              <h3>Summary</h3>
              <div className="profile">
                <img src={proicon} alt="" />
                <div className="procontent">
                  <span>Created by</span>
                  <label>Gleb Kuznetsov</label>
                  <span>Last updated 15 Nov 2017</span>
                </div>
              </div>
              <div className="tags-wrap">
                <div className="row">
                  <div className="col-sm-4">
                    <img src={docs} alt="" />
                    <label>7<span>docs</span></label>
                  </div>
                  <div className="col-sm-4">
                    <img src={tags} alt="" />
                    <label>7<span>docs</span></label>
                  </div>
                  <div className="col-sm-4">
                    <img src={moments} alt="" />
                    <label>7<span>docs</span></label>
                  </div>
                </div>
              </div>
              <div className="used-tags">
                <h5>Most frequently used tags</h5>
                <div className="tags red">
                  Remote Collaborate <span>11</span>
                </div>
                <div className="tags lightblue">
                  Videoconferencing <span>7</span>
                </div>
                <div className="tags green">
                  Whiteboarding <span>5</span>
                </div>
                <div className="tags purple">
                  Synthesis <span>5</span>
                </div>
                <div className="tags orange">
                  Multi-device collab <span>4</span>
                </div>
              </div>
              <div className="world-cloud">
                <h5>World Cloud <a href=""><i className="fa fa-cog"></i></a></h5>
                <img src={tagscloud} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
