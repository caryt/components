import React from 'react';

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

export const Tab = ({ children, id, tab, active, className = '' }) => {
    const isActive = tab ? (tab === id) : active;
    const classes = `${hasActive(isActive)} ${className}`;
    return <li role="presentation" className={classes}>
        <a href={`#${id}`} aria-controls={id} role="tab" data-toggle="tab">
            {children}
        </a>
    </li>;
};

export const TabLink = ({
    children, Page, id, tab, active, className = '',
}) => {
    const isActive = tab ? (tab === id) : active;
    const classes = `${hasActive(isActive)} ${className}`;
    return <li role="presentation" className={classes}>
        <Page tab={id} name={children} />
    </li>;
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
