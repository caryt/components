import React from 'react';
import { map } from 'reframed/index';

export const Container = ({ children, fluid }) =>
    <div className={fluid ? 'container-fluid' : 'container'}>
        {children}
    </div>;

export const Row = ({ className = '', children }) =>
    <div className={`row ${className}`}>
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
        const { cols, className = '', children } = this.props;
        return <div className={`${this.classes(cols)} ${className}`}>
            {children}
        </div>;
    }
}
