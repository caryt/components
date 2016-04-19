import React from 'react';
import {Router, doDispatch, createStore, config} from 'reframed/index';
import {logger} from 'reframed/index';
const log = logger('app');

/** A renderer that renders nothing - produces no output
 *  For example, this could exclude the entire UI when testing reducers.
**/
const nullRenderer = {render: () => false};

/** React uses synthetic events, change events on input boxes actually
 *  listen for this event, not $.trigger('change')
 **/
const event = new Event('input', { bubbles: true });

export class Application {
    constructor(options) {
        config.state = options.config;
        this.name = options.name || 'application';
        this.reducers = options.reducers || {};
        this.routes = options.routes || [];
        this.renderer = options.renderer || nullRenderer;
        this.root = document.getElementById(options.root || 'root');
        this.forEach(options.actions, (name, action) => this[name] = action);
        log.info(`initialize application ${this.name}`, this);
    }

    run() {
        const {reducers, name, listener} = this;
        log.info(`run application ${this.name}`, this);
        createStore({reducers, listener: listener.bind(this)});
    }

    listener() {
        //Note this is bound to app when this is called.
        //(See runApplication(), above)
        const {renderer, root, routes} = this;
        const router = <Router
            routes = {routes}
            app = {this}
        />;
        renderer.render(router, root)
    }

    forEach(obj, fn = (k, v) => ([k, v])) {
        Object.keys(obj).forEach(item => fn(item, obj[item]));
    }

    setInput(id, value) {
        const input = $(`#${id}`);
        input.val(value);
        input[0].dispatchEvent(event);
    }

    /** Immediately dispatch an action.
    **/
    do(...args) {
        doDispatch(...args);
    }
}
