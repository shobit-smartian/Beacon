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
    console.log(action.type)

    switch (action.type) {
        case LOGIN_REQUEST:
            return {...state, ...{loggingIn: true}};

        case LOGIN_SUCCESS:
            return {...state, ...{loggingIn: false, loginError: false, message: action.payload.message, user: action.payload.data}};

        case LOGIN_FAILURE:
            return {...state, ...{loggingIn: false, loginError: true, message: action.error.message, user: null}};


        case REGISTER_REQUEST:
            return {...state, ...{registerIn: true, registerError: false}};

        case REGISTER_SUCCESS:
            return {...state, ...{registerIn: false, registerError: false, message: action.payload.message}};

        case REGISTER_FAILURE:
            return {...state, ...{registerIn: false, registerError: true, message: action.payload.message}};

        default:
            return state;
    }
}
