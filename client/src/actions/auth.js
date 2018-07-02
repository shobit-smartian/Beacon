import {
    callApi,
    setIdToken,
    removeIdToken,
} from "../utils/apiUtils";


export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";


const headerObj = {
    "Accept": "application/json",
    "Content-Type": "application/json"
};

export function login(user, password) {

    const config = {
        method: "post",
        headers: headerObj,
        body: JSON.stringify({
            email: user,
            password: password

        })
    };

    return callApi(
        "user/login",
        config,
        (user) => {
            return {type: LOGIN_REQUEST, user}
        },
        (payload) => {
            setIdToken(payload.data.token);
            return {type: LOGIN_SUCCESS, user: {email: payload.data.email, name: payload.data.name}}
        },
        (error) => {
            removeIdToken();
            return {type: LOGIN_FAILURE, error}
        }
    );
}





export function register(user, plan) {

    let apiUrl = `user/register`;

    return callApi(
        apiUrl,
        {
            method: "POST",
            headers: headerObj,
            body: JSON.stringify({...user, ...{plan_type: plan}})
        },
        () => {
            return { type: REGISTER_REQUEST }
        },
        payload => {
            return { type: REGISTER_SUCCESS, payload: payload };
        },
        error => {
            return { type: REGISTER_FAILURE, error };
        }
    );
}
