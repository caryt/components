import React from 'react';

export const Tabs = ({children}) => 
    <ul className="nav nav-tabs" role="tablist">
        {children}
    </ul>;

export const Tab = ({children, id, active, className=''}) => {
    const classes = `${Active(active)} ${className}`;
    return <li role="presentation" className={classes}>
        <a href={`#${id}`} aria-controls={id} role="tab" data-toggle="tab">
            {children}
        </a>
    </li>;
}

export const Panels = ({children}) =>
	<div className="tab-content">
		{children}
	</div>;

export const Panel = ({children, id, active}) => {
    const classes = `tab-pane ${Active(active)}`;
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

