import React, {Component} from 'react';

import Message from './Message.jsx';

class Messages extends Component {
  render () {
    const messages = this.props.messages.map(message => {
      return <Message
        key={ message.id }
        username={ message.username }
        content={ message.content }/>
    });

    return (
      <main>
        { messages }
      </main>
    );
  }
}
export default Messages;



