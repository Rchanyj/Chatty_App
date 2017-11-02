import React, {Component} from 'react';
import Messages from './MessageList.jsx';
import Chatbar from './ChatBar.jsx';
import MessageSystem from './MessageSystem.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},
      userNumber: 0,
      notifyUserChange: '',
      messages: []
    }
    this.onNewPost = this.onNewPost.bind(this);
    this.onNewUser = this.onNewUser.bind(this);
  }

  //link new message text from chatbar, send to server
  onNewPost(content) {
    const userName = this.state.currentUser.name;
    // Add a new message to the list of messages in the data store
    const newMessage = {type: 'postMessage', username: userName, content: content};
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    //when user enters new username and presses enter, display notification of change

    this.socket.send(JSON.stringify(newMessage));
  }

  //link new username text from chatbar, update currentuser in this.state of App
  onNewUser(content) {
    //update ONLY if new user is different:
    if(this.state.currentUser.name !== content) {
      const userName = {name: content};
      //save previous username
      const oldUser = this.state.currentUser.name;
      this.setState({currentUser: userName});
      //send server notification of user change so it can broadcast
      const nameUpdateNotification = {type: 'postNotification', content: `${oldUser} has changed their name to ${content}.`};
      this.socket.send(JSON.stringify(nameUpdateNotification));
    };
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = event => {
      this.socket.send(JSON.stringify('Connected to server YAAAS!'));
    }
    this.socket.addEventListener('message', event => {
      const data = JSON.parse(event.data);
      //handle messages and notifications:
      switch(data.type) {
        //if new message:
        case 'incomingMessage':
          const newMessage = {type: data.type, id: data.id, username: data.username, content: data.content}
          this.setState({messages: this.state.messages.concat(newMessage)});
          break;
        //if username change notification:
        case 'incomingNotification':
          const notification = data.content;
          this.setState({notifyUserChange: notification});
          break;
        //number of users
        case 'number':
          const userNumber = data.content;
          this.setState({userNumber: userNumber});
      };
    });
  }

  render() {
    return (
      <main>
        <aside className='currentUsers'>{this.state.userNumber} user(s) online</aside>
        <Messages messages={this.state.messages} notification={this.state.notifyUserChange}/>
        <Chatbar username={this.state.currentUser.name} onNewUser={this.onNewUser}
        onNewPost={this.onNewPost} />
        <MessageSystem notification={this.state.notifyUserChange} />
      </main>
    );
  }
}
export default App;
















