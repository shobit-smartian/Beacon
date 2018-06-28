import React, {Component} from "react";
import {register} from "../actions/auth";



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

                                {
                                    registerError &&

                                    <div className="alert alert-danger">

                                        {registerError}

                                    </div>
                                }

                                <label>Get started with Beacon</label>

                                <form onSubmit={this.saveUser} className="mt-5">

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

                                                    <span onClick={this.changePasswordVisibility}
                                                          className="input-group-text">

                                                    <Icon> {!this.state.password_visibility ? `visibility_off` : `visibility`}</Icon>

                                                </span>

                                                </div>

                                        </div>

                                    </div>

                                    <div className="col-sm-12 form-group">

                                        <label className="checkbox-wrap"> I agree to the Terms of Service and Privacy Policy

                                            <input type="checkbox" />

                                                <span className="checkmark" > </span>

                                        </label>

                                    </div>

                                    <div className="col-sm-12 form-group">

                                        <button type="submit" className="btn primary-btn">Continue</button>

                                    </div>

                                </form>

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
                registerError: "PLease enter valid Input"
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
