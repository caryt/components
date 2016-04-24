import React from 'react';

export const Tabs = ({children}) => 
    <ul className="nav nav-tabs" role="tablist">
        {children}
    </ul>;

export const Tab = ({children, id, active}) => 
    <li role="presentation" className={name(active)}>
        <a href={`#${id}`} aria-controls={id} role="tab" data-toggle="tab">
        	{children}
    	</a>
    </li>;

export const Panels = ({children}) =>
	<div className="tab-content">
		{children}
	</div>;

export const Panel = ({children, id, active}) => 
    <div role="tabpanel" className={`tab-pane ${name(active)}`} id={id}>
        {children}
    </div>;

const name = active =>
	active ? 'active' : ''