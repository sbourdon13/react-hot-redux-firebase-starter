import React from 'react';

const ChatXMessage = ({ user, content, isSelf }) => {
    let wrapperClass = isSelf ? "chat-x-msg chat-x-msg-self" : "chat-x-msg chat-x-msg-other";
    return (
        <div className={wrapperClass}>
            <div className="chat-x-msg-username">{user}</div>
            <div>{content}</div>
        </div>
    );
};

ChatXMessage.propTypes = {
    user: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
    isSelf: React.PropTypes.bool.isRequired
};

export default ChatXMessage;
