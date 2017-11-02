import React, {Component} from 'react';

class Chatbar extends Component {

  //When username and message is submitted:
  onContent(event) {
    if(event.key == 'Enter'){
      this.props.onNewPost(event.target.value);
      event.target.value = '';
    }
  }

  //sends changed username to App to display
  //if enter:
  updateUserEnter(event) {
    if(event.key == 'Enter'){
      this.props.onNewUser(event.target.value);
    }
  }
  //if blur:
  updateUserBlur(event) {
    this.props.onNewUser(event.target.value);
  }

  render () {
    return (
      <footer className='chatbar'>
        <input className="chatbar-username" defaultValue={this.props.username} placeholder="Your Name (Optional)" onKeyPress={this.updateUserEnter.bind(this)}
        onBlur={this.updateUserBlur.bind(this)}/>
        <input className="chatbar-message" onKeyPress={ this.onContent.bind(this) } placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default Chatbar;
