import React from 'react';

export { entries, map, forEach, filter } from 'reframed/core/functional';

export const cloneElements = (children, props) =>
    React.Children.map(children, child =>
        React.cloneElement(child, props)
    );
