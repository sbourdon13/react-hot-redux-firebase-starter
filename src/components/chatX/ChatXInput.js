import React from 'react';
import TextInput from '../common/TextInput';

const ChatXInput = ({ content, onChange, onSave }) => {

    const getValue = (event) => {
        onChange(event.target.value);
    };

    const onClick = (event) => {
        event.preventDefault();
        onSave();
    };

    return (
        <div className="chat-x-footer row">
            <div className="chat-x-footer-left">
                <TextInput
                    name="msg"
                    label=""
                    value={content}
                    onChange={getValue}
                    placeholder="Enter message..."
                />
            </div>
            <div className="chat-x-footer-right">
                <input
                    type="submit"
                    value="Send"
                    className="btn btn-primary btn-block"
                    onClick={onClick} >
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
