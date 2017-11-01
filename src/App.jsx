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
    console.log(content);
    console.log(this);
    const userId = this.state.messages.length + 1;
    const userName = this.state.currentUser.name;
    // Add a new message to the list of messages in the data store
    const newMessage = {id: userId, username: userName, content: content};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }

  componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
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
