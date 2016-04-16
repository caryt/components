import React from 'react';

export const Container = ({children, fluid}) =>
    <div className={fluid ? 'container-fluid' : 'container'}>
        {children}
    </div>

export const Row = ({children}) =>
    <div className="row">
        {children}
    </div>

export const Col = ({cols, children}) =>
    <div className={`col-xs-${cols}`}>
        {children}
    </div>