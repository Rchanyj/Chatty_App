import React, {Component} from 'react';
import Messages from './MessageList.jsx'
import Chatbar from './ChatBar.jsx'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      messages: []
    }
    this.onNewPost = this.onNewPost.bind(this);
    this.onNewUser = this.onNewUser.bind(this);
  }

  //link new message text from chatbar, send to server
  onNewPost(content) {
    const userName = this.state.currentUser.name;
    // Add a new message to the list of messages in the data store
    const newMessage = {username: userName, content: content};
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.socket.send(JSON.stringify(newMessage));
  }

  //link new username text from chatbar, update currentuser in this.state of App
  onNewUser(content) {
    this.state.currentUser = {name: content};
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = event => {
      this.socket.send(JSON.stringify('Connected to server YAAAS!'));
    }
    this.socket.addEventListener('message', event => {
      const data = JSON.parse(event.data);
      const newMessage = {id: data.id, username: data.username, content: data.content}
      this.setState({messages: this.state.messages.concat(newMessage)});
    });
  }


  render() {
    return (
      <main>
        <Messages messages={this.state.messages} />
        <Chatbar username={this.state.currentUser.name} onNewUser={this.onNewUser}
        onNewPost={this.onNewPost} />
      </main>
    );
  }
}
export default App;
















