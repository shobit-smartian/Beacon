import React, { Component } from "react";
import "./step4.scss";

export default class Step4 extends Component {
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
                <div className="beta-tag">Bet</div>
                <div className="card-header">
                  <label className="step-count">STEP 4 of 4</label>
                  <h2>Record your interview</h2>
                </div>
                <div className="card-block">
                  <p>You are required to ask your interviewee for permission to record in order to use Beacon. Here are some examples of how to ask for consent:</p>
                  
                  <button className="btn btn-primary">Save my interview</button>
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
