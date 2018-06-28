import React, { Component } from "react";

import "./Register.css";

export default class Register extends Component {
  render() {
    return (
      <section className="Wrapper">
          <div className="container text-center">
            <div className="row">
              <div className="col-md-4" style={{ float: "none", margin: "0 auto" }}>
                <img src="" alt="logo" className="logo" />
                <div className="card">
                  <div className="card-header">Sythesize by Beacon</div>
                  <form className="card-block">
                    <div className="input-group">
                      <label>Name</label>
                      <input
                        type="text"
                        ref="username"
                        className="form-control"
                        placeholder="Full Name"
                        required
                        autoFocus
                      />
                    </div>
                    <div className="input-group">
                      <label>Role</label>
                      <input
                        type="text"
                        ref="username"
                        className="form-control"
                        placeholder="eg. User Researcher"
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label>Organization</label>
                      <input
                        type="text"
                        ref="username"
                        className="form-control"
                        placeholder="Organization Name"
                        required
                      />
                    </div>

                    <div className="input-group">
                      <label>What are you Sythesizing</label>
                      <select>
                       <option>Select an option</option>
                      </select>
                    </div>

                    <button
                      className="btn btn-primary"
                      onClick={this.handleLogin}
                    >Go to my dashboard
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
      </section>
    );
  }
}
