import React from 'react';
import { Link } from 'react-router';
import checkAuth from '../requireAuth';
import ChatXBody from './ChatXBody';
import ChatXInput from './ChatXInput';
import { messageSent, getInitial10Messages, getNewMessages } from '../../actions/chatXActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class ChatXPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.user = this.props.user.email;

        this.state = {
            newMessage: ""
        };

        this.updateInputState = this.updateInputState.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.setScrollToBottom = this.setScrollToBottom.bind(this);
    }

    componentDidMount() {
        this.props.actions.getNewMessages();
        this.props.actions.getInitial10Messages();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.isMessageListDifferent(prevProps.chatX.msgList, this.props.chatX.msgList)) {
            this.setScrollToBottom();
        }
    }

    isMessageListDifferent(prev, current) {
        const messageProperties = [
            'content',
            'sender',
            'isSelf'
        ];
        if (prev.length !== current.length) {
            return true;
        }

        Object.keys(current).map(key => {
            messageProperties.map((prop) => {
                if (prop in current[key]) {
                    if (current[key][prop] !== prev[key][prop]) {
                        return true;
                    }
                }
            });
        });
        return false;
    }

    updateInputState(messageContent) {
        return this.setState({ newMessage: messageContent });
    }

    sendMessage() {
        if (this.state.newMessage) {
            this.props.actions.messageSent({
                content: this.state.newMessage,
                sender: this.user
            })
                .then(() => {
                    this.setState({ 
                        newMessage: "" 
                    });
                });
        }
    }

    setScrollToBottom() {
        let el = document.getElementById("chat-x-body");
        el.scrollTop = el.scrollHeight;
    }

    render() {
        const chatX = this.props.chatX;
        return (
            <div>
                <div className="chat-x-header row">
                    <h1>Here you can chat with the other users</h1>
                </div>
                <ChatXBody messageList={chatX.msgList} />
                <ChatXInput
                    onChange={this.updateInputState}
                    onSave={this.sendMessage}
                    content={this.state.newMessage}
                />
            </div>
        );
    }
}


ChatXPage.propTypes = {
    user: React.PropTypes.object.isRequired,
    chatX: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        chatX: state.chatX
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ messageSent, getInitial10Messages, getNewMessages }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(checkAuth(ChatXPage));
