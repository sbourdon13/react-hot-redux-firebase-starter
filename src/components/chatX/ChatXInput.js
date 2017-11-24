import React from 'react';
import TextInput from '../common/TextInput';

const ChatXInput = ({ onChange, onSave }) => {

    const getValue = (event) => {
        onChange(event.target.value);
    };

    return (
        <div className="chat-x-footer row">
            <div className="chat-x-footer-left">
                <TextInput
                    name="msg"
                    label=""
                    onChange={getValue}
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
    onChange: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired
};

export default ChatXInput;
