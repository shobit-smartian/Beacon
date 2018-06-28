import React, {Component} from "react";
import PropTypes from "prop-types";

/////////////////////////////////////////////////////////////////////////
// BrowserRouter would be preferred over HashRouter, but BrowserRouter
// would require configuring the server. So we will use HashRouter here.
// Please change to BrowserRouter if you have your own backend server.
///////////////////////////////////////////////////////////////////////////
import {HashRouter as Router, Route, Switch} from "react-router-dom";

import {connect} from "react-redux";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";


import Home from "./containers/Home";
import Login from "./containers/Login";
import Docs from "./containers/Docs";
import RegisterPayment from "./containers/RegisterPayment";
import Register from "./containers/Register";
import NotFound from "./containers/misc/NotFound";

import PrivateRoute from "./containers/misc/PrivateRoute";

import {logout} from "./actions/auth";

import "./app.css";
import Record from "./containers/Record";



class App extends Component {


    render() {

        const {user} = this.props;
        console.log('-------->>', user)
        const isAuthenticated = user && true;

        return (

            <Router>

                <div>

                    <Header user={user} handleLogout={() => this.handleLogout()}/>

                    <div className="appContent">

                        <div className="main-container collapse-sidebar">

                            <Sidebar user={user} />

                            <Switch>

                                <Route path="/register" component={Register}/>

                                <Route path="/register_payment" component={RegisterPayment}/>

                                <Route exact path="/login" component={Login}/>

                                <PrivateRoute isAuthenticated={isAuthenticated}  path="/" component={Home} />

                                <PrivateRoute isAuthenticated={isAuthenticated} path="/records" component={Record}/>

                                <PrivateRoute isAuthenticated={isAuthenticated} path="/docs/:id" component={Docs}/>

                                <Route component={NotFound}/>

                            </Switch>

                        </div>

                    </div>

                    <Footer user={user} />

                </div>

            </Router>
        );
    }

    handleLogout() {
        const {user} = this.props;
        this.props.dispatch(logout(user));
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
