import React, {Component} from 'react';

class MessageSystem extends Component {
  render () {
    return (
      <div className='message system'>
        {this.props.notification}
      </div>
    );
  }
}
export default MessageSystem;