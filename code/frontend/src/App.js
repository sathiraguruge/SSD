import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import AlertTemplate from 'react-alert-template-basic'
import {Provider as AlertProvider } from 'react-alert'

// import SignInPage from './component/SignInPage';
import SignInPage2 from './component/SignInPage2';
import HomePage from './component/HomePage';
import HomePage2 from './component/HomePage2';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <AlertProvider template={AlertTemplate}>
                    <Route exact path="/" component={SignInPage2} />
                    </AlertProvider>
                    <Route exact path="/homepage" component={HomePage2} />
                </div>
            </Router>
        );
    }
}

export default App;