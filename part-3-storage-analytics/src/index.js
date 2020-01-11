import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify, { Storage } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
Storage.configure({ level: 'private' });

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
