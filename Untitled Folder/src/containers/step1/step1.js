import React, { Component } from "react";
import "./step1.scss";
import Record from "../../assets/images/record_interview.png";
import research from "../../assets/images/reserch.png";

export default class Step1 extends Component {
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
            <div className="offset-sm-3 col-sm-6">
              <div className="card text-center single">
                <div className="card-header">
                  <label className="step-count">STEP 1 of 3</label>
                  <h2>Choose your markers</h2>
                </div>
                <div className="card-block">
                  <p>Add up to six markers to use throughout your audio recording  then begin your interview.</p>
                  <button className="btn btn-primary">Next Step</button>
                </div>
                <div className="card-footer">
                  <a href="">Skip this step</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
