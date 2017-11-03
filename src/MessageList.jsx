import React, {Component} from 'react';

import Message from './Message.jsx';
import MessageSystem from './MessageSystem.jsx';

class Messages extends Component {
  render () {
    const messages = this.props.messages.map(message => {
      //renders based on message type (message vs notification)
      if (message.type === 'incomingMessage') {
        return <Message
          key={ message.id }
          username={ message.username }
          content={ message.content } />
      }
      if (message.type === 'incomingNotification') {
        return <MessageSystem notification={message.notice} />
      }
    });

    return (
      <main>
        { messages }
      </main>
    );
  }
}
export default Messages;



