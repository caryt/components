/** Router - Top Level React component
**/
import React from 'react';
import {Router as ReactRouter, browserHistory} from 'react-router';
import {config} from 'reframed/index';
import {logger} from 'reframed/index';
const log = logger('app');


/** A minimal configuration file.
 *  Contains a default LOG_CONFIGURATION which will log all events.
**/
const nullConfiguration = {LOG_CONFIGURATION: {}};

/** Router
**/
export class Router extends React.Component{
    render() {
        const {routes} = this.props;
        return <ReactRouter
            history = {browserHistory}
            routes = {routes}
        />
    }

    /** Access the app in Chrome Console with:
     *      page = $('#root')[0].app
    **/
    addDebugging() {
        if (config.ATTACH_COMPONENTS_TO_DOM) {
            document.querySelector(`#${config.PAGE_ROOT}`).app = this.props.app;
        }
    }

    componentDidUpdate() {
        this.addDebugging();
    }

    componentDidMount() {
        this.addDebugging();
    }
}

export const router = new Router();
