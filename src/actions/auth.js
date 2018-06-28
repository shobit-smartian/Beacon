import {
    callApi,
    ID_TOKEN,
    loadIdToken,
    setIdToken,
    removeIdToken,
    decodeUserProfile
} from "../utils/apiUtils";


export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";


function loginRequest(user) {
    return {
        type: LOGIN_REQUEST,
        user
    };
}

function loginSuccess(payload) {
    const idToken = payload.data.token;
    setIdToken(idToken);
    const profile = decodeUserProfile(idToken);

    return {
        type: LOGIN_SUCCESS,
        user: { email: payload.data.email, name: payload.data.name }
    };
}

function loginFailure(error) {
    removeIdToken();
    return {
        type: LOGIN_FAILURE,
        error
    };
}

export function login(user, password) {

    const config = {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: user,
            password: password

        })
    };

    return callApi(
        "http://localhost:4101/user/login",
        config,
        loginRequest(user),
        loginSuccess,
        loginFailure
    );
}

function logoutRequest(user) {
    removeIdToken();
    return {
        type: LOGOUT_REQUEST,
        user
    };
}

function logoutSuccess(payload) {
    removeIdToken();
    return {
        type: LOGOUT_SUCCESS,
        user: payload.user
    };
}

function logoutFailure(error) {
    return {
        type: LOGOUT_FAILURE,
        error
    };
}

export function logout(user) {
    const idToken = loadIdToken();
    const config = {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify({
            user
        })
    };

    return callApi(
        "/api/logout",
        config,
        logoutRequest,
        logoutSuccess,
        logoutFailure
    );
}


function registerRequest(user) {

    return {
        type: REGISTER_REQUEST,
        user
    };
}

function registerSuccess(payload) {

    return {
        type: REGISTER_SUCCESS,
        user: payload.data
    };
}

function registerFailure(error) {

    return {
        type: REGISTER_FAILURE,
        error
    };
}

export function register(user) {

    const config = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    };

    return callApi(
        "http://localhost:4101/user/register",
        config,
        registerRequest,
        registerSuccess,
        registerFailure
    );
}
