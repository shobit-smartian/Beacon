import React, { Component } from "react";
import "./step2.scss";

export default class Step2 extends Component {
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
                  <label className="step-count">STEP 2 of 3</label>
                  <h2>Remember to ask for permission</h2>
                </div>
                <div className="card-block">
                  <p>You are required to ask your interviewee for permission to record in order to use Beacon. Here are some examples of how to ask for consent:</p>
                  <ol>
                    <li>"We would like to record this interview. is that okay?"</li>
                    <li>"We are taking in a lot of new information today. Would it be okay to record the interview for notemaking purposes?"</li>
                  </ol>
                  <div className="form-check text-left">
                    <input className="form-check-input" type="checkbox" value="" id="check1" />
                    <label className="form-check-label" for="check1">
                      Check here to indicate that you will ask participants for permission to record the conversation. US federal law prohibits recording a conversation without consent.
                    </label>
                  </div>
                  <div className="form-check text-left">
                    <input className="form-check-input" type="checkbox" value="" id="check2" />
                    <label className="form-check-label" for="check2">
                      Do not show this message again
                    </label>
                  </div>
                  <button className="btn btn-primary">I will ask for permission to record</button>
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
