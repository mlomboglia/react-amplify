import React, { Component } from "react";
import "./App.css";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { S3Album } from 'aws-amplify-react';
import { Auth, API, graphqlOperation, Analytics, Storage } from "aws-amplify";
import "@aws-amplify/ui/dist/style.css";

const listTodos = `query listTodos {
  listTodos{
    items{
      id
      name
      description
    }
  }
}`;

const addTodo = `mutation createTodo($name:String! $description: String!) {
  createTodo(input:{
    name:$name
    description:$description
  }){
    id
    name
    description
  }
}`;

class App extends Component {
  
  todoMutation = async () => {
    const todoDetails = {
      name: "Party tonight!",
      description: "Amplify CLI rocks!"
    };

    const newTodo = await API.graphql(graphqlOperation(addTodo, todoDetails));
    alert(JSON.stringify(newTodo));
  };

  listQuery = async () => {
    console.log("listing todos");
    const allTodos = await API.graphql(graphqlOperation(listTodos));
    alert(JSON.stringify(allTodos));
  };

  state = { username: "" };

  async componentDidMount() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.setState({ username: user.username });
    } catch (err) {
      console.log("error getting user: ", err);
    }
  }

  recordEvent = () => {
    Analytics.record({
      name: "My test event",
      attributes: {
        username: this.state.username
      }
    });
  };

  uploadFile = (evt) => {
    const file = evt.target.files[0];
    const name = file.name;

    Storage.put(name, file).then(() => {
      this.setState({ file: name });
    })
  }

  fileToKey(data) {
    const { name, size, type } = data;
    return 'test_' + name;
  }

  render() {
    return (
      <div className="App">
        <AmplifySignOut />
        <p> Click a button </p>
        <button onClick={this.listQuery}>GraphQL List Query</button>
        <button onClick={this.todoMutation}>GraphQL Todo Mutation</button>
        <button onClick={this.recordEvent}>Record Event</button>
        <p> Pick a file</p>
        <input type="file" onChange={this.uploadFile} />
        <S3Album path="pictures/" picker fileToKey={this.fileToKey} />
      </div>
    );
  }
}

export default withAuthenticator(App, true);
