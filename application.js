import React from 'react';
import { Application } from 'reframed/core/application';
import { Router, doDispatch, createStore, config, forEach }
    from 'reframed/index';

/** React uses synthetic events, change events on input boxes actually
 *  listen for this event, not $.trigger('change')
 **/
const event = new Event('input', { bubbles: true });

export class ReduxApplication extends Application {
    initialize(options) {
        config.state = options.config;
        this.reducers = options.reducers || {};
        this.routes = options.routes || [];
        forEach(options.actions, (key, value) => {
            this[key] = value;
        });
    }

    run() {
        super.run();
        const { reducers, listener } = this;
        createStore({ reducers, listener: listener.bind(this) });
    }

    listener() {
        this.render(<Router routes={this.routes} app={this} />);
    }

    render(component) {
        const { renderer, root } = config;
        renderer.render(component, root);
    }

    setInput(id, value) {
        const input = $(`#${id}`); // eslint-disable-line no-undef
        input.val(value);
        input[0].dispatchEvent(event);
    }

    /** Immediately dispatch an action.
    **/
    do(...args) {
        doDispatch(...args);
    }
}
