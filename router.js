/** Router - Top Level React component
**/
import React from 'react';
import {Router as ReactRouter, browserHistory} from 'react-router';
import {ATTACH_COMPONENTS_TO_DOM} from 'config/environment';
import {i18n, Application, configureLoggers} from 'components/index';
import {logger} from 'components/logger';
const log = logger('app');


/** A minimal configuration file.
 *  Contains a default LOG_CONFIGURATION which will log all events.
**/
const nullConfiguration = {LOG_CONFIGURATION: {}};

/** Router
**/
export class Router extends React.Component{
    /** Initialize the Logging and Internationalization subsystems.
    **/
    setConfig(config=nullConfiguration) {
        configureLoggers(config.LOG_CONFIGURATION);
        log.info('set Configuration', config);
        log.info(`set i18n Domain: "${i18n.options.domain}"`, i18n);
    }

    App(app) {
        this.setConfig(app.config);
        this.app = new Application(app);
        return this.app;
    }

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
        if (ATTACH_COMPONENTS_TO_DOM) {
            document.querySelector('#root').app = this.props.app;
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
