import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import authReducer from './auth';
import dataReducer from './data';
import authReducer from './login';
import userdataReducer from './userdata'
import registerReducer from './register'

export default combineReducers({
    login: authReducer,
    auth: authReducer,
    data: dataReducer,
    userdata: userdataReducer,
    routing: routerReducer,
    register: registerReducer,
});
