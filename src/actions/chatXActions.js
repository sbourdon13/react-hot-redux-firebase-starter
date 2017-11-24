import firebaseApi from '../api/firebase';
import * as types from './actionTypes';

import { ajaxCallError, beginAjaxCall } from './ajaxStatusActions';
import toastr from 'toastr';

/////////////////////////////////////
// Map firebase data to expected format
/////////////////////////////////////

function extractMessageProperties(firebaseMsg, user) {

    const message = {};
    const messageProperties = [
        'content',
        'sender'
    ];

    messageProperties.map((prop) => {
        if (prop in firebaseMsg) {
            message[prop] = firebaseMsg[prop];
        }
    });
    message.isSelf = false;
    if (message.sender) {
        message.isSelf = (message.sender === user);
    }

    return message;
}

function extractMsgListProperties(firebaseMsgList, user) {
    let messageList = [];
    if (firebaseMsgList) {
        messageList = Object.keys(firebaseMsgList).map(key => extractMessageProperties(firebaseMsgList[key], user));
    }
    return messageList;
}


/////////////////////////////////////
// Action types
/////////////////////////////////////


export function chatXinitialMsgListLoadedSuccess(msgList, firstKey) {
    return {
        type: types.CHATX_INITIAL_MSG_LIST_LOADED_SUCCESS,
        msgList,
        firstKey
    };
}

export function chatXNewMsgListLoadedSuccess(msgList) {
    return {
        type: types.CHATX_NEW_MSG_LIST_LOADED_SUCCESS,
        msgList
    };
}

export function chatXClearSuccess() {
    return {
        type: types.CHATX_CLEAR_SUCCESS
    };
}

/////////////////////////////////////
// Actions
/////////////////////////////////////

export function getInitial10Messages() {
    return (dispatch, getState) => {
        return firebaseApi.getLast10Children('/chatX/')
            .then(
            (messageList) => {
                let key = "";
                if (messageList.val()) {
                    key = Object.keys(messageList.val())[0];
                }
                let msgList = extractMsgListProperties(messageList.val(), getState().user.email);
                dispatch(chatXinitialMsgListLoadedSuccess(msgList, key));
            })
            .catch(
            error => {
                dispatch(ajaxCallError(error));
                toastr.error('Error loading previous messages');
                // @TODO better error handling
                throw (error);
            });
    };
}


export function messageSent(message) {
    let messageKey = firebaseApi.createKey('/chatX/');
    return (dispatch, getState) => {
        return firebaseApi.databaseSet('/chatX/' + messageKey, message)
            .catch(
            error => {
                dispatch(ajaxCallError(error));
                toastr.error('Error: message not sent');
                // @TODO better error handling
                throw (error);
            });
    };
}


export function getMessageListStartAtKey(key) {
    return (dispatch, getState) => {
        return firebaseApi.getChildrenStartAtKey('/chatX/', key)
            .then(
            (messageList) => {
                return dispatch(chatXNewMsgListLoadedSuccess(extractMsgListProperties(messageList.val(), getState().user.email)));
            })
            .catch(
            error => {
                dispatch(ajaxCallError(error));
                toastr.error('Error loading messages');
                // @TODO better error handling
                throw (error);
            });
    };
}


export function getNewMessages(callback) {
    return (dispatch, getState) => {
        return firebaseApi.getChildAdded('/chatX/', (snap) => {
            if (getState().chatX.isDataLoaded) {
                if (getState().chatX.firstKey) {
                    dispatch(getMessageListStartAtKey(getState().chatX.firstKey));
                } else {
                    dispatch(getInitial10Messages());
                }
            }
        });
    };
}

export function clearChatX() {
    return (dispatch) => {
        dispatch(chatXClearSuccess());
    };
}


