import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chatXReducer(state = initialState.chatX, action) {
    switch (action.type) {
        case types.CHATX_INITIAL_MSG_LIST_LOADED_SUCCESS:
            return Object.assign({}, state, {
                isDataLoaded: true,
                msgList: action.msgList
            });
        case types.CHATX_FIRST_MSG_KEY_FETCHED:
            return Object.assign({}, state, {
                firstKey: action.firstKey
            });
        case types.CHATX_NEW_MSG_LIST_LOADED_SUCCESS:
            return Object.assign({}, state, {
                msgList: action.msgList
            });
        case types.CHATX_CLEAR_SUCCESS:
            return initialState.chatX;
        case types.AUTH_LOGGED_OUT_SUCCESS:
            return initialState.chatX;
        default:
            return state;
    }
}