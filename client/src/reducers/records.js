import {
    SAVE_RECORD_SUCCESS,
    SAVE_RECORD_FAILURE,
    GET_RECORD_SUCCESS,
    GET_RECORD_FAILURE, SAVE_RECORD_REQUEST, GET_RECORD_REQUEST
} from "../actions/records";
import {loadUserProfile} from "../utils/apiUtils";



const initialState = {

    recordingIn: false,
    userProfile: null,
    record: null,
    recordErr: false,
    message: null
};



function initializeState() {
    return { ...initialState, ...{ userProfile: loadUserProfile()} };
}


export default function records(state = initializeState(), action = {}) {

    switch (action.type) {

        case SAVE_RECORD_REQUEST:
            return { ...state, ...{recordingIn: true} };

        case SAVE_RECORD_SUCCESS:
            return { ...state, ...{recordingIn: false, record: action.payload} };

        case SAVE_RECORD_FAILURE:
            return { ...state, ...{recordingIn: false, recordErr: true, record: action.payload} };

        case GET_RECORD_REQUEST:
            return state = { record: action.payload };

        case GET_RECORD_SUCCESS:
            return state = { record: action.payload };

        case GET_RECORD_FAILURE:
            return state = { record: action.payload };

        default:
            return state;
    }
}
