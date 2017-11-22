import React from 'react';
import ChatXMessage from './ChatXMessage';


const ChatXBody = ({ messageList }) => {
    let list = [];
    if (messageList !== []) {
        list = messageList.map((msg, index) => {
            return <ChatXMessage key={index} user={msg.sender} content={msg.content} isSelf={msg.isSelf} />;
        });
    }

    return (
        <div className="chat-x-body row" id="chat-x-body">
            {list}
        </div>
    );
};

ChatXBody.propTypes = {
    messageList: React.PropTypes.array.isRequired
};

export default ChatXBody;

