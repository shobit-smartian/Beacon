import React, {Component} from "react";
import PropTypes from "prop-types";

/////////////////////////////////////////////////////////////////////////
// BrowserRouter would be preferred over HashRouter, but BrowserRouter
// would require configuring the server. So we will use HashRouter here.
// Please change to BrowserRouter if you have your own backend server.
///////////////////////////////////////////////////////////////////////////
import {BrowserRouter, Route, Switch} from "react-router-dom";

import {connect} from "react-redux";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";


import Home from "./containers/Home";
import Login from "./containers/Login";
import Docs from "./containers/Docs";
import Record from "./containers/Record";
import RegisterPayment from "./containers/RegisterPayment";
import Register from "./containers/Register";
import NotFound from "./containers/misc/NotFound";

import PrivateRoute from "./containers/misc/PrivateRoute";

import ForgotPassword from "./containers/ForgotPassword";

import "./app.css";
import RegisterSuccess from "./containers/RegisterSuccess";



class App extends Component {



    render() {

        const isAuthenticated = localStorage.getItem('id_token') && true;

        return (

            <BrowserRouter>

                <div>

                    <Header handleLogout={() => this.handleLogout()}/>

                    <div className="appContent">

                        <div className="main-container collapse-sidebar">

                            <Sidebar />

                            <Switch>

                                <Route path="/register" component={Register}/>

                                <Route path="/forgot_password" component={ForgotPassword}/>

                                <Route path="/register_payment" component={RegisterPayment}/>

                                <Route path="/register_success" component={RegisterSuccess}/>

                                <Route path="/login" component={Login}/>

                                <PrivateRoute isAuthenticated={isAuthenticated} exact path="/" component={Home} />

                                <PrivateRoute isAuthenticated={isAuthenticated} path="/records" component={Record}/>

                                <PrivateRoute isAuthenticated={isAuthenticated} path="/docs/:id" component={Docs}/>

                                <Route component={NotFound}/>

                            </Switch>

                        </div>

                    </div>

                    <Footer />

                </div>

            </BrowserRouter>
        );
    }

    handleLogout = () => {
        // const {user} = this.props;
        // this.props.dispatch(logout(user));
        localStorage.removeItem('id_token');
    }
}

App.propTypes = {
    user: PropTypes.string,
    dispatch: PropTypes.func.isRequired
};

App.contextTypes = {
    store: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const {auth} = state;
    return {
        user: auth ? auth.user : null
    };
};

export default connect(mapStateToProps)(App);
