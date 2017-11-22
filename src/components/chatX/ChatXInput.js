import React from 'react';
import TextInput from '../common/TextInput';

const ChatXInput = ({ content, onChange, onSave }) => {
    return (
        <div className="chat-x-footer row">
            <div className="chat-x-footer-left">
                <TextInput
                    name="msg"
                    label=""
                    value={content}
                    onChange={onChange}
                    placeholder="Enter message..."
                />
            </div>
            <div className="chat-x-footer-right">
                <input
                    type="submit"
                    value="Send"
                    className="btn btn-primary btn-block"
                    onClick={onSave} >
                </input>
            </div>
        </div>
    );
};

ChatXInput.propTypes = {
    content: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired
};

export default ChatXInput;
