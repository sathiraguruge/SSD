import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

// import SignInPage from './component/SignInPage';
import SignInPage2 from './component/SignInPage2';
import {Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import HomePage from './component/HomePage';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <AlertProvider template={AlertTemplate}>
                    <Route exact path="/" component={SignInPage2} />
                    </AlertProvider>
                    <Route exact path="/homepage" component={HomePage} />
                </div>
            </Router>
        );
    }
}

export default App;