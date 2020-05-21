import React from "react";
import "./App.css";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

function App() {
  return (
    <div>
      <AmplifySignOut />
      My App
    </div>
  );
}

export default withAuthenticator(App, true);
