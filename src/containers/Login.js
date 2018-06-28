import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {login} from "../actions/auth";

import "./_styles/login_register.scss";


import eye from '../assets/images/eye-icon.png';
import {Link} from "react-router-dom";


class Login extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }


    componentWillReceiveProps(nextProps) {

        console.log('login props kdfhasdjkhadlfd;gjkl', nextProps)

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

                    <div className="col-sm-6 p-0">

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

                    <div className="col-sm-6">

                        <div className="login-wrapper">

                            <div className="col-sm-12 text-right">

                                <a className="btn signin-btn">Sign in</a>

                            </div>

                            <div className="col-sm-12 center-form">

                                {
                                    !user && loginError &&

                                    <div className="alert alert-danger">

                                        {loginError.message}. Hint: use admin/password to log in.

                                    </div>
                                }

                                <label>Welcome to Beacon</label>

                                <form className="mt-5 mb-4">

                                    <div className="col-sm-12 form-group">

                                        <input
                                            ref="username"
                                            type="text"
                                            placeholder="Your work email"
                                            required
                                            className="form-control"
                                        />

                                    </div>

                                    <div className="col-sm-12 form-group">
                                     <p className="error-msg text-left">
                                       Please enter valid email
                                     </p>
                                    </div>

                                    <div className="col-sm-12 form-group">

                                        <div className="input-group">

                                            <input
                                                type="password"
                                                ref="password"
                                                className="form-control"
                                                placeholder=""
                                                required

                                            />

                                            <div className="input-group-append">

                                                <span className="input-group-text">

                                                    <img
                                                        src={eye}/>

                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-sm-12 form-group">
                                     <p className="error-msg text-left">
                                       Wrong Password. Try again or click Forgot password to reset it.
                                     </p>
                                    </div>

                                    <div className="col-sm-12 form-group">

                                        <button onClick={this.handleLogin} className="btn primary-btn">Sign in</button>

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

                                            <a href="">Forgot Password?</a>

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
    const {auth} = state;
    if (auth) {
        return {user: auth.user, loginError: auth.loginError};
    }
    return {user: null};
}

export default connect(mapStateToProps)(Login);
