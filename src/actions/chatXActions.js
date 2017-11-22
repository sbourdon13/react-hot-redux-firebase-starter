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

function getFirstMessageKey(firebaseMsgList) {
    if (firebaseMsgList) {
        return Object.keys(firebaseMsgList)[0];
    }
}

/////////////////////////////////////
// Action types
/////////////////////////////////////

export function messageSentSuccess() {
    return {
        type: types.CHATX_MSG_SENT_SUCCESS
    };
}

export function chatXinitialMsgListLoadedSuccess(msgList) {
    return {
        type: types.CHATX_INITIAL_MSG_LIST_LOADED_SUCCESS, msgList
    };
}

export function chatXFirstMsgKeyFetched(firstKey) {
    return {
        type: types.CHATX_FIRST_MSG_KEY_FETCHED, firstKey
    };
}

export function chatXNewMsgListLoadedSuccess(msgList) {
    return {
        type: types.CHATX_NEW_MSG_LIST_LOADED_SUCCESS, msgList
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
                dispatch(chatXFirstMsgKeyFetched(getFirstMessageKey(messageList.val())));
                return dispatch(chatXinitialMsgListLoadedSuccess(extractMsgListProperties(messageList.val(), getState().user.email)));
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
        let msg = extractMessageProperties(message, getState().user.email);
        return firebaseApi.databaseSet('/chatX/' + messageKey, msg)
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
        let msg = {};
        return firebaseApi.getRef('/chatX/')
            .on('child_added', (snap) => {
                if (getState().chatX.isDataLoaded) {
                    msg = extractMessageProperties(snap.val(), getState().user.email);
                    callback(msg);
                }
            });
    };
}

export function clearChatX() {
    return (dispatch) => {
        dispatch(chatXClearSuccess());
    };
}


