import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import injectTapEventPlugin from 'react-tap-event-plugin';

import logo from "../assets/images/logo.png";
import menu from "../assets/images/hamburgr.png";

import "./_styles/header.scss";
injectTapEventPlugin();


class Header extends Component {


    onLogoutClick = event => {
        event.preventDefault();
        this.props.handleLogout();
        this.props.history.replace("/login");
    };


    render() {

        const pathname = this.props.history.location.pathname;
        const isLoginPage = pathname.indexOf("register") > -1;
        const isRegisterPage = pathname.indexOf("login") > -1;

        return (

            !isLoginPage && !isRegisterPage &&

            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">

                <div className="navbar-brand">

                    <Link to="/" className="pull-left">

                        <img src={logo} alt="logo"/>

                    </Link>

                    <Link to="/" className="pull-right">

                        <img src={menu} alt="logo"/>

                    </Link>

                </div>

                <button
                    type="button"
                    className="navbar-toggler"
                    data-toggle="collapse"
                    data-target="#navbarCollapse"
                >

                    <span className="navbar-toggler-icon"/>

                </button>

                <div id="navbarCollapse" className="collapse navbar-collapse">

                    <form className="form-inline my-2 my-lg-0">

                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>

                    </form>

                    <ul className="navbar-nav ml-auto mt-2 mt-md-0">

                        <li>

                            <span className="proicon">A</span>

                            <i className="fa fa-angle-down"> </i>

                        </li>

                    </ul>


                </div>

            </nav>

        );
    }
}

Header.propTypes = {
    user: PropTypes.string,
    handleLogout: PropTypes.func.isRequired
};

export default withRouter(Header);
