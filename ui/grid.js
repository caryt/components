import React from 'react';
import { map } from 'reframed/index';

export const Container = ({ children, fluid, id = null }) =>
    <div id={id} className={fluid ? 'container-fluid' : 'container'}>
        {children}
    </div>;

export const Row = ({ className = '', children, id = null, title = ''}) =>
    <div id={id} className={`row ${className}`} data-title={title}>
        {children}
    </div>;

export class Col extends React.Component {
    classes(cols) {
        if (typeof cols === 'number') {
            return `col-xs-${cols}`;
        }
        return map(cols, (key, value) =>
            `col-${key}-${value}`
        ).join(' ');
    }

    render() {
        const { cols, className = '', children, id = null } = this.props;
        return <div id={id} className={`${this.classes(cols)} ${className}`}>
            {children}
        </div>;
    }
}
