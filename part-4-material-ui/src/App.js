import React, { Component } from "react";
import "./App.css";
import { S3Album, withAuthenticator } from "aws-amplify-react"; // or 'aws-amplify-react-native';
import { API, graphqlOperation, Storage } from "aws-amplify";

import { makeStyles } from "@material-ui/core/styles";

import NavBar from './components/NavBar/NavBar'
import SideDrawer from './components/SideDrawer/SideDrawer'

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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

function App() {

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const classes = useStyles();

  const todoMutation = async () => {
    const todoDetails = {
      name: "Party tonight!",
      description: "Amplify CLI rocks!"
    };

    const newTodo = await API.graphql(graphqlOperation(addTodo, todoDetails));
    alert(JSON.stringify(newTodo));
  };

  const listQuery = async () => {
    console.log("listing todos");
    const allTodos = await API.graphql(graphqlOperation(listTodos));
    alert(JSON.stringify(allTodos));
  };

  const uploadFile = evt => {
    const file = evt.target.files[0];
    const name = file.name;

    Storage.put(name, file).then(() => {
      this.setState({ file: name });
    });
  };

  return (
    <div className={classes.root}>
      <NavBar />
      <SideDrawer />
    </div>
  );
}

const signUpConfig = {
  defaultCountryCode: "86",
  usernameAttributes: "email",
  hiddenDefaults: ["username", "phone_number", "email"],
  signUpFields: [
    {
      label: "Email",
      key: "username",
      required: true,
      displayOrder: 1,
      type: "string"
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 2,
      type: "password"
    }
  ]
};

export default withAuthenticator(App, { signUpConfig });
