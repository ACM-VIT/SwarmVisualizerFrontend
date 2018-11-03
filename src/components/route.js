import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './dashboard';

class Router extends Component {
    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/dashboard' component={Dashboard}/>
                </Switch>
            </BrowserRouter>
        );
    }

}

export default Router;