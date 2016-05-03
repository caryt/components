/** Router - Top Level React component
**/
import React from 'react';
import { Router as ReactRouter, browserHistory } from 'react-router';
import { config } from 'reframed/index';

/** Router
**/
export class Router extends React.Component {
    componentDidMount() {
        this.addDebugging();
    }

    componentDidUpdate() {
        this.addDebugging();
    }

    /** Access the app in Chrome Console with:
     *      page = $('#root')[0].app
    **/
    addDebugging() {
        if (config.ATTACH_COMPONENTS_TO_DOM) {
            document.querySelector(`#${config.PAGE_ROOT}`).app = this.props.app;
        }
    }

    /** Programatically navigate to a new `path`.
    **/
    navigateTo(path) {
        browserHistory.push(path);
    }

    render() {
        const { routes } = this.props;
        return <ReactRouter
          history={browserHistory}
          routes={routes}
        />;
    }
}

export const router = new Router();

export const NAVIGATE = { type: 'NAVIGATE' };

/** Create and return a new action that navigates to `path` **/
export const createNavigation = path => (
    { ...NAVIGATE, path }
);
