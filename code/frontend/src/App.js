import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import AlertTemplate from 'react-alert-template-basic'
import {Provider as AlertProvider} from 'react-alert'

import SignInPage from './component/SignInPage';
import HomePage from './component/HomePage';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <AlertProvider template={AlertTemplate}>
                        <Route exact path="/" component={SignInPage}/>
                        <Route exact path="/homepage" component={HomePage}/>
                    </AlertProvider>
                </div>
            </Router>
        );
    }
}

export default App;