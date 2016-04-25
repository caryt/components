import React from 'react';
import { dispatch, logger } from 'reframed/index';
const log = logger('async');

export class Component extends React.Component {
    delay(duration, fn, ...args) {
        return (duration > 0)
            ? (...args) =>
                window.setTimeout(fn, duration, ...args)
            : fn;
    }

    render() {
        const { completed, reducer, duration, state, dispatcher } = this.props;
        const { action } = state;
        const onCompleted = dispatch(completed, dispatcher);
        const delayedCompleted = this.delay(duration, onCompleted);
        if (action.type) {
            log.debug(`dispatch ${completed.type}`, { ...state });
            reducer(state, action).end(delayedCompleted);
        }
        return false;
    }
}
