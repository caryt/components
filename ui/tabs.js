import React from 'react';
import { dispatch } from 'reframed/index';

const hasActive = active => (
    active ? 'active' : ''
);

const hasStacked = stacked => (
    stacked ? 'nav-stacked' : ''
);

export const Tabs = ({ children }) =>
    <ul className="nav nav-tabs" role="tablist">
        {children}
    </ul>;

export const Tab = ({
    children, id, tab, active, Link = null, action = null, className = '',
}) => {
    const isActive = tab ? (tab === id) : active;
    const classes = `${hasActive(isActive)} ${className}`;
    let item;
    if (Link) {
        item = <Link tab={id} name={children} />;
    } else if (action) {
        const click = dispatch(action);
        item = <a href={`#${id}`} onClick={click} aria-controls={id} role="tab" data-toggle="tab">
            {children}
        </a>;
    } else {
        item = <a href={`#${id}`} aria-controls={id} role="tab" data-toggle="tab">
            {children}
        </a>;
    }
    return <li role="presentation" className={classes}>{item}</li>;
};

export const Panels = ({ children }) =>
    <div className="tab-content">
        {children}
    </div>;

export const Panel = ({ children, id, tab, active }) => {
    const isActive = tab ? (tab === id) : active;
    const classes = `tab-pane ${hasActive(isActive)}`;
    return <div role="tabpanel" className={classes} id={id}>
        {children}
    </div>;
};

export const Pills = ({ children, stacked, className = '' }) => {
    const classes = `nav nav-pills ${hasStacked(stacked)} ${className}`;
    return <ul className={classes} role="tablist">
        {children}
    </ul>;
};
