/** Routines to create and manage a Redux store.
 *  The store contains a collection of reducer functions. It responds to
 *  events and uses the reducers to compute a new state base don the action.
 *
 *  Several dispatcher functions are provided to cater for different classes of actions.
 **/
import React from 'react';
import * as Redux from 'redux';
import {logger} from 'components/logger';
const log = logger('store');

const EXTENSION = (createStore) =>
    window.devToolsExtension
        ? window.devToolsExtension()(createStore)
        : createStore;

/** Global (singleton) variable exposing the store.
 *  This enables easy access to the application state without passing it around.
**/
export var store = null;

/** createStore ...
**/
export function createStore({reducers, listener}) {
    store = EXTENSION(Redux.createStore)(Redux.combineReducers(reducers));
    Object.defineProperty(store, 'state', {get: () => store.getState()});
    store.subscribe(listener);
    listener();
    return store;
}

const _dispatcher = (action, args) => {
    log.debug(`dispatch ${action.type}`, args);
    store.dispatch({...action, ...args});
    log.trace('new state', store.state);
}

/** Generic Dispatch function to dispatch any action.
    Defaults to dispatching a standard action if no additional details provided
**/
export const dispatch = (_action, fn=action) => {
    const {dispatcher, ...args} = fn;
    return dispatcher.bind(null, null, _action, ...args);
}

/** Immediately dispatch an action.
**/
export const doDispatch = (...args) =>
    dispatch(...args)();

export const action = {
    dispatcher: (component, action, args) =>
        _dispatcher(action, {}, args)
};

export const event = {
    dispatcher: (component, action, event) =>
        _dispatcher(action, {value: event.target.value})
};

export const resource = {
    dispatcher: (component, action, _error, result) =>
        _dispatcher(action, _error ? {_error} : result)
};



