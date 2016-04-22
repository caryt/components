import React from 'react';
import {Router, doDispatch, createStore, config} from 'reframed/index';
import {logger} from 'reframed/index';
const log = logger('app');

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
        this.forEach(options.actions, (name, action) => this[name] = action);
        log.info(`initialize application ${this.name}`, this);
    }

    run() {
        const {reducers, name, listener} = this;
        log.info(`run application ${this.name}`, this);
        createStore({reducers, listener: listener.bind(this)});
    }

    listener() {
        this.render(<Router routes = {this.routes} app = {this} />); 
    }

    render(component) {
        const {renderer, root} = config;
        renderer.render(component, root)
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
