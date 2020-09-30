import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import SignInPage from './component/SignInPage';
import HomePage from './component/HomePage';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={SignInPage} />
                    <Route exact path="/homepage" component={HomePage} />
                </div>
            </Router>
        );
    }
}

export default App;