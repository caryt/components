import React from 'react';
import { dispatch, logger } from 'reframed/index';

export class Component extends React.Component {
    delay(duration, fn, ...args) {
        return (duration > 0)
            ? (...args) =>
                window.setTimeout(fn, duration, ...args)
            : fn;
    }

    render() {
        const { id, reducer, duration, state, dispatcher } = this.props;
        const { action, completed } = state;
        if (action.type) {
            const onCompleted = (completed && completed.type === 'NAVIGATE')
                ? dispatch(completed)
                : dispatch(completed, dispatcher);
            const delayedCompleted = this.delay(duration, onCompleted);
            reducer(state, action).end(delayedCompleted);
        }
        return false;
    }
}
