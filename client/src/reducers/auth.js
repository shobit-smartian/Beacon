import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from "../actions/auth";

import {loadUserProfile} from "../utils/apiUtils";

const initialState = {
    user: null,
    password: null,
    loggingIn: false,
    registerIn: false,
    loginError: null,
    registerError: null
};

function initializeState() {
    const userProfile = loadUserProfile();
    return Object.assign({}, initialState, userProfile);
}

export default function auth(state = initializeState(), action = {}) {

    switch (action.type) {

        case LOGIN_REQUEST:
            return {...state, ...{loggingIn: true}};

        case LOGIN_SUCCESS:
            console.log(action.user);
            return {...state, ...{loggingIn: false, user: action.user}};

        case LOGIN_FAILURE:
            return {...state, ...{loggingIn: false, loginError: action.error}};


        case REGISTER_REQUEST:
            return {...state, ...{registerIn: true, registerError: null}};

        case REGISTER_SUCCESS:
            return {...state, ...{registerIn: false, registerError: null, response: action.payload}};

        case REGISTER_FAILURE:
            return {...state, ...{registerIn: false, registerError: action.error}};

        default:
            return state;
    }
}
