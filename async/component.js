import React from 'react';
import { dispatch } from 'reframed/index';

export class Component extends React.Component {
    delay(duration, fn, ...args) {
        return (duration > 0)
            ? (...args) =>
                window.setTimeout(fn, duration, ...args)
            : fn;
    }

    then(action, completed, dispatcher) {
        if (action && action.type && completed && this.isMatch(completed)) {
            const { reducer, duration, state } = this.props;
            const onCompleted = dispatch(completed, dispatcher);
            const delayedCompleted = this.delay(duration, onCompleted);
            reducer(state, action).end(delayedCompleted);
        }
    }

    isMatch(completed) {
        return completed;
    }

    render() {
        return false;
    }
}

// Note: This isn't used (yet!)
export class Navigator extends Component {
    isMatch(completed) {
        return completed.type === 'NAVIGATE';
    }

    render() {
        const { resource } = this.props;
        this.then(resource.action, resource.completed);
        return super.render();
    }
}
