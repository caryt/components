import React from 'react';

export const Table = ({ header, children, ...props }) =>
    <table className="table table-hover" {...props}>
        <thead>
            {React.createElement(header)}
        </thead>
        <tbody>
            {children}
        </tbody>
    </table>;
