import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

import "./login.css";

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      // logged in, let's show redirect if any, or show home
      try {
        const { from } = this.props.location.state || {
          from: { pathname: "/" }
        };
        nextProps.history.replace(from);
      } catch (err) {
        nextProps.history.replace("/");
      }
    }
  }

  handleLogin(event) {
    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    this.props.dispatch(login(username.value, password.value));
    username.value = "";
    password.value = "";
  }

  render() {
    const { user, loginError } = this.props;
    return (
      <section className="Wrapper">
          <div className="container text-center">
            <div className="row">
              <div className="col-md-5" style={{ float: "none", margin: "0 auto" }}>
                <img src="" alt="logo" className="logo" />
                <div className="card">
                  <div className="card-header">Login to your account</div>
                  <form className="card-block">
                    <div className="input-group">
                      <label>Username</label>
                      <input
                        type="text"
                        ref="username"
                        className="form-control"
                        placeholder="Username (hint: admin)"
                        required
                        autoFocus
                      />
                    </div>

                    <div className="input-group">
                      <label>Password</label>
                      <input
                        type="password"
                        ref="password"
                        className="form-control"
                        placeholder="Password (hint: password)"
                        required
                      />
                    </div>
                    <div className="row">
                      <div className="checkbox col-sm-6 text-left">
                        <label>
                          <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                      </div>

                      <div className="checkbox col-sm-6 text-left">
                        <label>
                          <a href="">forgot password?</a>
                        </label>
                      </div>
                    </div>

                    {!user &&
                      loginError &&
                      <div className="alert alert-danger">
                        {loginError.message}. Hint: use admin/password to log in.
                      </div>}

                    <button
                      className="btn btn-primary"
                      onClick={this.handleLogin}
                    >Log in
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

Login.contextTypes = {
  store: PropTypes.object.isRequired
};

Login.propTypes = {
  user: PropTypes.string,
  loginError: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { auth } = state;
  if (auth) {
    return { user: auth.user, loginError: auth.loginError };
  }

  return { user: null };
}

export default connect(mapStateToProps)(Login);
