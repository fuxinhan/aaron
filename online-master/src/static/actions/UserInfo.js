import axios from 'axios'
import { push } from 'react-router-redux'
import { SERVER_URL } from '../utils/config'
import { USER_DETAIL_RECEIVE, USER_DETAIL_FETCH } from '../constants/index'
import { authLoginUserFailure } from './login'

export function userDetailReceive(data) {
    return {
        type: USER_DETAIL_RECEIVE,
        payload: {
            data
        }
    }
}

export function userDetailFetch() {
    return {
        type: USER_DETAIL_FETCH
    }
}

export function getUserDataFetch(token){
    console.log(token)

    return(dispatch,state) =>{
        dispatch(userDetailFetch())
        return axios.get(`${SERVER_URL}/UserHandler/Users/`,{

            headers:{
                Accept: 'application/json',
                Authorization: `JWT ${token}`
            }

        }).then((response) => {

            dispatch(userDetailReceive(response.data))

        }).catch((error) => {

            if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                // Invalid authentication credentials
                return error.response.json().then((data) => {
                    dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
                    dispatch(push('/login'));
                });
            } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                // Server side error
                dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
            } else {
                // Most likely connection issues
                dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
            }

            dispatch(push('/login'));
            return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way

        })
    }
}