import React, {Component} from "react";
import {register} from "../actions/auth";


import eye from '../assets/images/eye-icon.png';
import lock from '../assets/images/lock.png';
import sale from '../assets/images/sale-banner.png';

import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Icon} from "@material-ui/core/es/index";


class Register extends Component {


    constructor(props) {
        super(props);
        this.saveUser = this.saveUser.bind(this);

        this.state = {
            registerError: null
        }
    }


    componentWillReceiveProps(nextProps) {

        if (nextProps.user) {
            // logged in, let's show redirect if any, or show home
            try {
                const {from} = this.props.location.state || {
                    from: {pathname: "/login"}
                };
                nextProps.history.replace(from);
            } catch (err) {
                nextProps.history.replace("/login");
            }
        }
    }


    render() {

        const {registerError} = this.state;

        return (

            <div className="container-fluid">

                <div className="row">

                    <div className="col-sm-7 p-0">

                        <div className="inner-wrapper">

                            <div className="col-sm-12">

                                <ul className="list-inline">

                                    <li className="list-inline-item">

                                        {/*<img src="images/logo.png">*/} Logo

                                    </li>

                                    <li className="list-inline-item">Nav Item 1</li>

                                    <li className="list-inline-item">Nav Item 2</li>

                                    <li className="list-inline-item">Nav Item 3</li>

                                </ul>

                            </div>

                            <div className="col-sm-12">

                                <div className="billing-section">

                                    <label>Choose a billing cycle</label>
                                    <div className="d-flex plan-action">

                                      <span className="plan-name"> <img src={sale} className="sale-img" />Yearly</span>
                                      <span>
                                        <label className="switch">
                                          <input type="checkbox" />
                                          <span className="slider round"></span>
                                        </label>
                                      </span>
                                      <span className="plan-name"> Monthly </span>
                                    </div>
                                    <div className="details-container">
                                      <p className="head-title">Monthly</p>
                                      <p className="form-link-text">
                                        Document your user interviews faster  and get more from  your research over time.
                                      </p>
                                      <ul className="points-list">
                                        <li><i class="material-icons">done</i> <span>Tag important moments live , during user interviews</span></li>
                                        <li><i class="material-icons">done</i> <span> Synthesize your researchacross Google docs</span></li>
                                        <li><i class="material-icons">done</i> <span> Documents user insights quickly and efficiently </span></li>
                                      </ul>
                                      <div className="price-container">
                                        <div className="value">
                                            <span>$<label>13</label>*</span>
                                            <span>/MO</span>
                                        </div>
                                        <div className="discount">
                                            Save 24 $ a year
                                        </div>
                                    </div>
                                    </div>

                            <div className="col-sm-12 h-75">

                                <div className="center-img">

                                    Image TBD

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col-sm-5">

                        <div className="login-wrapper">

                            <div className="col-sm-12 text-right">

                                <Link to="/login" className="btn signin-btn">Sign in</Link>

                            </div>

                            <div className="col-sm-12 center-form register-form">

                                <div className="error-msg ">
                                  <i class="material-icons">clear</i> <span> An account with this email already exists, Sign in or choose another email. </span>
                                </div>

                                {
                                    registerError &&

                                    <div className="alert alert-danger">

                                        {registerError}

                                    </div>
                                }
                                
                                <label>Get started with Beacon</label>

                                <form onSubmit={this.saveUser} className="mt-5">

                                    <p>1. Create an account</p>
                                <form className="mt-5">

                                    <p>1. Create an account</p>

                                    <div className="col-sm-12 form-group">

                                        <input ref="name" type="text" placeholder="Full name" className="form-control" />

                                    </div>

                                    <div className="col-sm-12 form-group">

                                        <input ref="email" type="text" placeholder="Your work email" className="form-control" />

                                    </div>

                                    <div className="col-sm-12 form-group">

                                        <div className="input-group">

                                            <input ref="password" type="password" className="form-control" placeholder="Password" />

                                                <div className="input-group-append">

                                                    <span className="input-group-text">

                                                    <Icon> {!this.state.password_visibility ? `visibility_off` : `visibility`}</Icon>

                                                </span>

                                                        <img src={eye} />

                                                    </span>

                                                </div>

                                        </div>

                                    </div>

                                    <div className="col-sm-12 form-group text-right">

                                        <a class="form-link-text">Enter a discount coupon</a>

                                    </div>

                                    <div className="col-sm-12 form-group">

                                        <button type="submit" className="btn primary-btn">Continue</button>

                                    </div>

                                </form>

                                <div className="col-lg-12 next-step-bar mt-5">

                                    <label>2. Payment <img src={lock} /></label>

                                    <p>Sign up and proceed to payment</p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        );
    }


    saveUser = (event) => {

        event.preventDefault();

        if (!this.refs.name.value || !this.refs.email.value || !this.refs.password.value) {
            this.setState({
                registerError: "PLease enter valid Inpit"
            });
            return false;
        }



        this.props.dispatch(register({
            email: this.refs.email.value,
            name: this.refs.name.value,
            password: this.refs.password.value,
        }));

        this.refs.name.value = this.refs.email.value = this.refs.password.value = '';

    }


    changePasswordVisibility = () => {

        this.setState({
            password_visibility: !this.state.password_visibility
        });
        this.refs.password.setAttribute('type', (!this.state.password_visibility ? `text` : `password`))
    }


}


Register.contextTypes = {
    store: PropTypes.object.isRequired
};

Register.propTypes = {
    user: PropTypes.string,
    registerError: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {

    const {auth} = state;

    if (auth) {
        return {user: { email: '', name: '' }, registerError: auth.registerError};
    }
    return {user: null};
}

export default connect(mapStateToProps)(Register);
