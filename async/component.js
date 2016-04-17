import React from 'react';
import {dispatch} from 'components/app/store';
import {logger} from 'components/index';
const log = logger('async');

export class Component extends React.Component {
    render() {
        const {completed, reducer, duration, state, dispatcher} = this.props;
        const {action} = state;
        const onCompleted = dispatch(completed, dispatcher);
        const delayedCompleted = this.delay(duration, onCompleted);
        if (action.type) {
            log.debug(`dispatch ${completed.type}`, {...state});
            reducer(state, action).end(delayedCompleted);
        }
        return false;
    }

    delay(duration, fn, ...args) {
        return (duration > 0)
            ? (...args) =>
                window.setTimeout(fn, duration, ...args)
            : fn;
    }
}
