import { USER_DETAIL_RECEIVE, USER_DETAIL_FETCH } from '../constants/index'

const initialState = {
    data: null,
    isFetching: false,
}

export default function dataReducer(state=initialState, action) {
    switch(action.type) {
        case USER_DETAIL_RECEIVE:
            return Object.assign({}, state, {
                data: action.payload.data,
                isFetching: false
            })
        case USER_DETAIL_FETCH:
            return Object.assign({}, state, {
                isFetching: true
            })
        default:
            return state;
    }
}
