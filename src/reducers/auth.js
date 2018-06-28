import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE
} from "../actions/auth";

import {loadUserProfile} from "../utils/apiUtils";

const initialState = {
    user: null,
    password: null,
    userRole: null,
    loggingIn: false,
    registerIn: false,
    loggingOut: false,
    loginError: null,
    registerError: null
};

function initializeState() {
    const userProfile = loadUserProfile();
    console.log(userProfile)
    return Object.assign({}, initialState, userProfile);
}

export default function auth(state = initializeState(), action = {}) {
    switch (action.type) {

        case LOGIN_REQUEST:
            return Object.assign({}, state, {loggingIn: true});

        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                loggingIn: false,
                user: action.user
            });

        case LOGIN_FAILURE:
            return {
                ...state,
                loggingIn: false,
                user: null,
                role: null,
                loginError: action.error
            };

        case LOGOUT_REQUEST:
            return {
                ...state,
                loggingOut: true
            };

        case LOGOUT_SUCCESS:
            return {
                ...state,
                loggingOut: false,
                user: null,
                userRole: null,
                loginError: null
            };

        case LOGOUT_FAILURE:
            return {
                ...state,
                loggingOut: false,
                logoutError: action.error
            };

        case REGISTER_REQUEST:
            return {
                ...state,
                registerIn: true,
                user: null
            };

        case REGISTER_SUCCESS:
            return {
                ...state,
                registerIn: false,
                user: action.user,
                registerError: null
            };

        case REGISTER_FAILURE:
            return {
                ...state,
                registerIn: false,
                registerError: action.error
            };

        default:
            return state;
    }
}
