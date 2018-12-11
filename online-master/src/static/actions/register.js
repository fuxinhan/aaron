import axios from 'axios'
import { push } from 'react-router-redux';
import { SERVER_URL } from '../utils/config';
import {
    REGIST_USER,
    REGIST_USER_FAILURE,
    REGIST_USER_REQUEST,
    REGIST_USER_SUCCESS,
    SEND_CODE_REQUEST,
} from '../constants/index'

export function registerUserSuccess(token, username, name){
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('username', JSON.stringify(username))
    sessionStorage.setItem('name', JSON.stringify(name))
    return {
        type: REGIST_USER_SUCCESS,
        payload: {
            token,
            username,
            name,
            statusCode,
        }
    }
}

export function registerUserFailure(error, message) {
    sessionStorage.removeItem('token')
    return {
        type: REGIST_USER_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    }
}

export function registerUserRequest() {
    return {
        type: REGIST_USER_REQUEST
    }
}

export function sendCodesRequest() {
    return {
        type: SEND_CODE_REQUEST
    }
}

export function sendCodes(username) {
    return (dispatch) => {
        dispatch(sendCodesRequest())
        return axios({
            method: 'POST',
            url: `${SERVER_URL}/UserHandler/SmsCodes/1/`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                mobile: `${username}`,
            }
    }).then((resp) => {
        console.log("send code success, 返回的数据是: ", resp)    
    }).catch((error) => {
        if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
            // Invalid authentication credentials
            return error.response.json().then((data) => {
                dispatch(registerUserFailure(401, data.non_field_errors[0]));
            });
        } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                // Server side error
                dispatch(registerUserFailure(500, 'A server error occurred while sending your data!'));
        } else if(error.response){
            alert(error.response.data.mobile[0])
        }
        else {
                // Most likely connection issues
                dispatch(registerUserFailure('Connection Error', 'An error occurred while sending your data!'));
        }
            return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
        });
    }
}

export function registerUser(username, code, password, redirect = '/login') {
    return (dispatch) => {
        dispatch(registerUserRequest())
        return axios({
            method: 'POST',
            url: `${SERVER_URL}/UserHandler/Users/`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                username: `${username}`,
                name:`${username}`,
                code: `${code}`,
                mobile:`${username}`,
                password: `${password}`,
               
            }
        }).then((resp) => {
            if (resp.status === 201 && resp.data.token){
                dispatch(registerUserSuccess(resp.data.token, resp.data.username, resp.data.name))
                dispatch(push(redirect))
            }
            console.log("registerUser resp: ", resp)
        }).catch((error) => {
            if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                // Invalid authentication credentials
                return error.response.json().then((data) => {
                    dispatch(registerUserFailure(401, data.non_field_errors[0]));
                });
            } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                // Server side error
                dispatch(registerUserFailure(500, 'A server error occurred while sending your data!'));
            } else {
                // Most likely connection issues
                dispatch(registerUserFailure('Connection Error', 'An error occurred while sending your data!'));
            }
            if(error.response.data.code[0]){
                alert(error.response.data.code[0])
            }else if(error.response.data.mobile[0]){
                alert(error.response.data.mobile[0])
            }
            return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
        });
    }
}
