import {
    REGIST_USER,
    REGIST_USER_FAILURE,
    REGIST_USER_REQUEST,
    REGIST_USER_SUCCESS,
    SEND_CODE_REQUEST,
    PHONECODE,
} from '../constants/index'

const initialState = {
    token: null,
    name: null,
    username: null,
    code: null,
    password: null,
    statusText: null,
}

export default function registerReducer(state = initialState, action){
    switch (action.type) {
        case REGIST_USER_REQUEST:
            return Object.assign({}, state, {
                statusText: null
            })

        case REGIST_USER_SUCCESS:
            return Object.assign({}, state, {
                userName: action.payload.username,
                token: action.payload.token,
                name: action.payload.name,
                statusText: '注册成功',
            })

        case REGIST_USER_FAILURE:
            return Object.assign({}, state, {
                token: null,
                name: null,
                username: null,
                statusText: `注册失败: ${action.payload.status} - ${action.payload.statusText}`
            })

        case SEND_CODE_REQUEST:
            return Object.assign({}, state, {
                token: null,
                name: null,
                username: null,
                code: null,
                statusText: '发送验证码'
            })

        case PHONECODE:
            return Object.assign({}, state, action.data)
        default:
            return state;
    }
}
