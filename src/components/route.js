import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './dashboard';
import Login from './login';

class Router extends Component {
    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/dashboard' component={Dashboard}/>
                    <Route exact path="/login" component={Login}/>
                </Switch>
            </BrowserRouter>
        );
    }

}

export default Router;