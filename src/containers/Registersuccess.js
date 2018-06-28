import React, {Component} from "react";
import {register} from "../actions/auth";


import successbanner from '../assets/images/successsign.jpg';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";


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

                    <div className="col-sm-6 p-0">

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

                                
                            <div className="center-img">

                                    Image TBD

                            </div>


                        </div>

                    </div>

                    <div className="col-sm-6">

                        <div className="login-wrapper">

                            <div className="col-sm-12 text-right">

                                <Link to="/login" className="btn signin-btn">Sign in</Link>

                            </div>

                            <div className="col-sm-12 center-form register-success">

                                <img src={successbanner} className="mb-3" />
                                <label classNamelink-form-text>You're all set!</label>

                                <form className="mt-1">
                                  
                                    <div className="headline">
                                         <p> Sign in with the link in your email.</p>
                                    </div>

                                    <div className="col-sm-12 form-group">

                                        <button className="btn primary-btn">Resend the email </button>

                                    </div>

                                    <div className="col-sm-12 form-group">
                                      <p> Change my email from email@companyname.com </p>
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
