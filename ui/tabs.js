import React from 'react';

export const Tabs = ({children}) => 
    <ul className="nav nav-tabs" role="tablist">
        {children}
    </ul>;

export const Tab = ({children, id, tab, active, className=''}) => {
    const isActive = tab ? (tab === id) : active;
    const classes = `${Active(active)} ${className}`;
    return <li role="presentation" className={classes}>
        <a href={`#${id}`} aria-controls={id} role="tab" data-toggle="tab">
            {children}
        </a>
    </li>;
}

export const TabLink = ({children, LinkTo, id, tab, active, className=''}) => {
    const isActive = tab ? (tab === id) : active;
    const classes = `${Active(isActive)} ${className}`;
    return <li role="presentation" className={classes}>
        <LinkTo tab={id} name={children}/> 
    </li>;
}

export const Panels = ({children}) =>
	<div className="tab-content">
		{children}
	</div>;

export const Panel = ({children, id, tab, active}) => {
    const isActive = tab ? (tab === id) : active;
    const classes = `tab-pane ${Active(isActive)}`;
    return <div role="tabpanel" className={classes} id={id}>
        {children}
    </div>
};

export const Pills = ({children, stacked, className=''}) => {
    const classes = `nav nav-pills ${Stacked(stacked)} ${className}`;
    return <ul className={classes} role="tablist">
        {children}
    </ul>;
}

const Active = active =>
    active ? 'active' : ''

const Stacked = stacked =>
    stacked ? 'nav-stacked' : ''

