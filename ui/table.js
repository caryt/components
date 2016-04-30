import React from 'react';

export const Table = ({ children, ...props }) =>
    <table className="table table-hover" {...props}>
        <tbody>
            {children}
        </tbody>
    </table>;
