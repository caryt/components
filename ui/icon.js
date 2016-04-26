import React from 'react';

export const Icon = ({ fa = null, arrow = null, className = '' }) => {
    if (fa) {
        return <i className={`fa fa-${fa} ${className}`} />;
    } else if (arrow) {
        return <i className={className}>{arrow}</i>;
    }
    return null;
};
