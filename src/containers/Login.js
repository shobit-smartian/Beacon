import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {login} from "../actions/auth";

import "./_styles/login_register.scss";


import {Link} from "react-router-dom";


// material components
import {Icon} from "@material-ui/core/es/index";


class Login extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            password_visibility: false
        }
    }


    componentDidMount() {

        this.handleLogout()
    }


    componentWillReceiveProps(nextProps) {
        
        if (nextProps.user) {
            // logged in, let's show redirect if any, or show home
            try {
                const {from} = this.props.location.state || {
                    from: {pathname: "/"}
                };
                nextProps.history.replace(from);
            } catch (err) {
                nextProps.history.replace("/");
            }
        }
    }


    render() {

        const {user, loginError} = this.props;

        return (

            <div className="container-fluid">

                <div className="row">

                    <div className="col-sm-7 p-0">

                        <div className="inner-wrapper">

                            <div className="col-sm-12">

                                <ul className="list-inline">

                                    <li className="list-inline-item">

                                        {/*<img src="images/logo.png"> */}

                                        Logo

                                    </li>

                                    <li className="list-inline-item">Nav Item 1</li>

                                    <li className="list-inline-item">Nav Item 2</li>

                                    <li className="list-inline-item">Nav Item 3</li>

                                </ul>

                            </div>


                            <div className="center-img">

                                Image TBD

                            </div>


                        </div>

                    </div>

                    <div className="col-sm-5">

                        <div className="login-wrapper">

                            <div className="col-sm-12 center-form">

                                {
                                    !user && loginError &&

                                    <div className="error-msg ">

                                        <i className="material-icons">clear</i> <span> Please provide valid input. </span>

                                    </div>
                                }
                                 
                                <div className="success-msg ">

                                        <i className="material-icons">done</i> <span> You're all set. Sign in with your new password below.z </span>

                                </div>

                                <label>Welcome to Beacon</label>

                                <form onSubmit={this.handleLogin} className="mt-5 mb-4">

                                    <div className="col-sm-12 form-group">

                                        <input
                                            ref="username"
                                            type="email"
                                            placeholder="Your work email"
                                            className="form-control"
                                        />

                                    </div>

                                    <div className="col-sm-12 form-group">

                                        <div className="input-group">

                                            <input
                                                type="password"
                                                ref="password"
                                                className="form-control"
                                                placeholder="Password"
                                            />

                                            <div className="input-group-append">

                                                <span onClick={this.changePasswordVisibility}
                                                      className="input-group-text">

                                                    <Icon> {!this.state.password_visibility ? `visibility_off` : `visibility`}</Icon>

                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-sm-12 form-group">

                                        <button type="submit" className="btn primary-btn">Sign in</button>

                                    </div>

                                    <div className="col-sm-12 p-4">

                                        <span className="float-left form-link-text">

                                            <label className="checkbox-wrap">

                                                Remember me

                                                <input type="checkbox"/>

                                                <span className="checkmark"> </span>

                                            </label>

                                        </span>

                                        <span className="float-right form-link-text">

                                            <Link to="/forgot_password">Forgot Password?</Link>

                                        </span>

                                    </div>

                                    <div className="col-sm-12 bottom-bar">

                                        <span className="form-link-text">

                                            <a href="">Don't have an account?  </a>

                                        </span>

                                        <span>

                                            <Link to="/register">Sign up</Link>

                                        </span>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        );

    }


    handleLogin = (event) => {
        event.preventDefault();
        this.props.dispatch(
            login(this.refs.username.value, this.refs.password.value)
        );
        this.refs.username.value = this.refs.password.value = '';
    };


    changePasswordVisibility = () => {

        this.setState({
            password_visibility: !this.state.password_visibility
        });
        this.refs.password.setAttribute('type', (!this.state.password_visibility ? `text` : `password`))
    };


    handleLogout = (event) => localStorage.removeItem('id_token');

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
    const {auth} = state;
    if (auth) {
        return {user: auth.user, loginError: auth.loginError};
    }
    return {user: null};
}

export default connect(mapStateToProps)(Login);
