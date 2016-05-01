/** Routines to create and manage a Redux store.
 *  The store contains a collection of reducer functions. It responds to
 *  events and uses the reducers to compute a new state based on the action.
 *
 *  Several dispatcher functions are provided to cater for different classes of actions.
 **/
import React from 'react';
import * as Redux from 'redux';
import { logger } from 'reframed/index';
const log = logger('store');

const EXTENSION = createStore => (
    window.devToolsExtension
        ? window.devToolsExtension()(createStore)
        : createStore
);

/** Global (singleton) variable exposing the store.
 *  This enables easy access to the application state without passing it around.
**/
export var store = null;

/** createStore ...
**/
export function createStore({ reducers, listener }) {
    store = EXTENSION(Redux.createStore)(Redux.combineReducers(reducers));
    Object.defineProperty(store, 'state', { get: () => store.getState() });
    store.subscribe(listener);
    listener();
    return store;
}

/** Immediately dispatch an action.
**/
export const doDispatch = (action, args) => {
    log.debug(`dispatch ${action.type}`, args);
    store.dispatch({ ...args, ...action });
    log.trace('new state', store.state);
};

/** Generic Dispatch function to return a function that dispatches any action.
    Defaults to dispatching a standard action if no additional details provided
**/
export const dispatch = (_action, fn = action) => {
    const { dispatcher, ...args } = fn;
    return (dispatcher === undefined)
        ? doDispatch(_action, args)
        : dispatcher.bind(null, null, _action, ...args);
};

/** The default dispatcher that simply passes args as the new state.
**/
export const action = {
    dispatcher: (component, action, args) =>
        doDispatch(action, {}, args),
};

/** A dispatcher that receives an event in args and passes on its value.
 *  Designed to use with text input boxes.
**/
export const event = {
    dispatcher: (component, action, event) =>
        doDispatch(action, { id: event.target.id, value: event.target.value }),
};

/** A dispatcher that receives a HTTP response in args and passes on the
 *  response. For convience the response values are spead.
 *  Designed to use with HHTP request library, i.e. superagent.
**/
export const resource = {
    dispatcher: (component, action, error, response) =>
        doDispatch(action, { ...response.body, error, response }),
};

export const recharts = {
    dispatcher: (component, action, entry, index, event) =>
        doDispatch(action, entry),
};
