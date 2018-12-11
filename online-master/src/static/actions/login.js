import fetch from 'isomorphic-fetch';
import axios from 'axios'
import { push } from 'react-router-redux';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER
} from '../constants';


export function authLoginUserSuccess(token, user, usererr) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            token,
            user,
            usererr,
        }
    };
}

export function authLoginUserFailure(error, message) {
    sessionStorage.removeItem('token');
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function authLoginUserRequest() {
    return {
        type: LOGIN_USER_REQUEST
    };
}

export function authLogout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('usererr');
    return {
        type: LOGOUT_USER
    };
}

export function authLogoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(authLogout());
        dispatch(push('/login'));
        return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
    };
}

export function authLoginUser(username, password, redirect = '/userinfo') {
    return (dispatch) => {
        dispatch(authLoginUserRequest());
        const auth = btoa(`${username}:${password}`);
        return axios({
            method: 'POST',
            url: `${SERVER_URL}/UserHandler/Tokens/`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization':'JWT token值'
            },
            data: {
                username: `${username}`,
                password: `${password}`
            }
        }).then((resp) => {

            if (resp.status === 200 && resp.data.token) {

                dispatch(authLoginUserSuccess(resp.data.token, `${username}`));
                dispatch(push(redirect));
                // dispatch(push('/profile'));
              }
        }).catch((error) => {
            if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                // Invalid authentication credentials
                return error.response.json().then((data) => {
                    dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
                });
            } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                // Server side error
                dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
            } else {
                // Most likely connection issues
                dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
            }
            
            if(error.response.data.non_field_errors[0]){
                alert(error.response.data.non_field_errors[0])
            }
            
            return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
        })
    };
}
