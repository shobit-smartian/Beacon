import {
    SAVE_RECORD_SUCCESS,
    SAVE_RECORD_FAILURE,
    GET_RECORD_SUCCESS,
    GET_RECORD_FAILURE
} from "../actions/records";






function initializeState() {
    return {}
}

export default function records(state = initializeState(), action = {}) {

    switch (action.type) {

        case SAVE_RECORD_SUCCESS:
            return state = { record: action.payload };

        case SAVE_RECORD_FAILURE:

            return state = { record: action.payload };

        case GET_RECORD_SUCCESS:
            return state = { record: action.payload };

        case GET_RECORD_FAILURE:
            return state = { record: action.payload };

        default:
            return state;
    }
}
