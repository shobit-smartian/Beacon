import React, { Component } from "react";
import "./home.css";
import Record from "../../assets/images/record_interview.png";
import research from "../../assets/images/reserch.png";

export default class Home extends Component {
  render() {
    return (
      <div className="main-container collapse-sidebar">
        <div className="sidebar ">
          <ul className="sidenav">
            <li className="dashboard active"><a href="">Dashboard</a></li>
            <li className="files"><a href="">My Files</a></li>
            <li className="help"><a href="">Help</a></li>
            <li className="archive"><a href="">Archives</a></li>
          </ul>
        </div>
        <div className="main-content">
          <div className="row">
            <div className="offset-md-1 col-md-5 col-sm-6">
              <div className="card text-center dashboard">
                <div className="beta-tag top20">Bet</div>
                <div className="card-header">
                  <h2>Record an interview</h2>
                </div>
                <div className="card-block">
                  <img src={Record} alt="Record Interview" />
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.</p>
                  <button className="btn btn-primary">Get Started</button>
                </div>
                <div className="card-footer">
                  <a href="">Learn more</a>
                </div>
              </div>
            </div>
            <div className="offset-md-1 col-md-5 col-sm-6">
              <div className="card text-center dashboard">
                <div className="card-header">
                  <h2>Synthesize my research</h2>
                </div>
                <div className="card-block">
                  <img src={research} alt="Research" />
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.</p>
                  <button className="btn btn-primary">Open your Google Drive</button>
                </div>
                <div className="card-footer">
                  <a href="">Learn more</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
