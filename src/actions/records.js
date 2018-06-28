import {
    callApi
} from "../utils/apiUtils";


export const SAVE_RECORD_REQUEST = "SAVE_RECORD_REQUEST";
export const SAVE_RECORD_SUCCESS = "SAVE_RECORD_SUCCESS";
export const SAVE_RECORD_FAILURE = "SAVE_RECORD_FAILURE";

export const GET_RECORD_REQUEST = "GET_RECORD_REQUEST";
export const GET_RECORD_SUCCESS = "GET_RECORD_SUCCESS";
export const GET_RECORD_FAILURE = "GET_RECORD_FAILURE";



export function saveRecord(payload) {

    const config = {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };

    return callApi(
        "/api/saveRecords",
        config,
        () => { return { type: SAVE_RECORD_REQUEST } },
        (response) => { return { type: SAVE_RECORD_SUCCESS, payload: response } },
        () => { return { type: SAVE_RECORD_FAILURE } }
    );
}


export function getRecord(id) {

    const config = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    return callApi(
        `/api/getRecord?record_id=${id}`,
        config,
        () => { return { type: GET_RECORD_REQUEST } },
        (response) => { return { type: GET_RECORD_SUCCESS, payload: response.data } },
        () => { return { type: GET_RECORD_FAILURE } }
    );
}


