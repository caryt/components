import React from 'react';
import { map } from 'reframed/index';

export const Container = ({ children, fluid, id = null }) =>
    <div id={id} className={fluid ? 'container-fluid' : 'container'}>
        {children}
    </div>;

export const Row = ({ className = '', children, title = '', ...rest }) =>
    <div className={`row ${className}`} data-title={title} { ...rest }>
        {children}
    </div>;

const classes = (cols) => {
    if (typeof cols === 'number') {
        return `col-xs-${cols}`;
    }
    return map(cols, (key, value) =>
        `col-${key}-${value}`
    ).join(' ');
};

export const Col = ({ cols, className = '', children, ...rest }) =>
    <div className={`${classes(cols)} ${className}`} { ...rest }>
        {children}
    </div>;
