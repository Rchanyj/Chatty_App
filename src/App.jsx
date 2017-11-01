import React, {Component} from 'react';
import Messages from './MessageList.jsx'
import Chatbar from './ChatBar.jsx'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: []
    }
    this.onNewPost = this.onNewPost.bind(this);
  }

  onNewPost(content) {
    const userId = this.state.messages.length + 1;
    const userName = this.state.currentUser.name;
    // Add a new message to the list of messages in the data store
    const newMessage = {id: userId, username: userName, content: content};
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.socket.send(JSON.stringify(newMessage));
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
        <Chatbar username={this.state.currentUser.name}
        onNewPost={this.onNewPost} />
      </main>
    );
  }
}
export default App;
















