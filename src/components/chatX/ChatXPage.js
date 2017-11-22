import React from 'react';
import { Link } from 'react-router';
import checkAuth from '../requireAuth';
import ChatXBody from './ChatXBody';
import ChatXInput from './ChatXInput';
import { messageSent, getInitial10Messages, getNewMessages, getMessageListStartAtKey } from '../../actions/chatXActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class ChatXPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.user = this.props.user.email;

        this.state = {
            messageList: [],
            newMessage: ""
        };

        this.newMsgCallback = this.newMsgCallback.bind(this);
        this.getInitialMessageList = this.getInitialMessageList.bind(this);
        this.updateInputState = this.updateInputState.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.setScrollToBottom = this.setScrollToBottom.bind(this);
    }

    componentDidMount() {
        this.props.actions.getNewMessages(this.newMsgCallback);
        this.getInitialMessageList();
    }

    newMsgCallback(msg) {
        this.props.actions.getMessageListStartAtKey(this.props.chatX.firstKey)
            .then(() => {
                this.setState({ messageList: this.props.chatX.msgList });
                this.setScrollToBottom();
            });
    }

    getInitialMessageList() {
        this.props.actions.getInitial10Messages()
            .then(() => {
                this.setState({ messageList: this.props.chatX.msgList });
                this.setScrollToBottom();
            });
    }

    updateInputState(event) {
        let newMsg = event.target.value;
        return this.setState({ newMessage: newMsg });
    }

    sendMessage(event) {
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
        return (
            <div>
                <div className="chat-x-header row">
                    <h1>Here you can chat with the other users</h1>
                </div>
                <ChatXBody messageList={this.state.messageList} messageCount={this.state.messageCount} />
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
        actions: bindActionCreators({ messageSent, getInitial10Messages, getNewMessages, getMessageListStartAtKey }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(checkAuth(ChatXPage));
