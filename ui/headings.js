import React from 'react';
import { hasPermission } from 'reframed/index';

export const H1 = ({ className = '', permission = null, children }) => (
    (hasPermission(permission))
        ? <h1 className={className}>
            {children}
        </h1>
        : null
    );

export const H2 = ({ className = '', permission = null, children }) => (
    (hasPermission(permission))
        ? <h2 className={className}>
            {children}
        </h2>
        : null
    );

export const H3 = ({ className = '', permission = null, children }) => (
    (hasPermission(permission))
        ? <h3 className={className}>
            {children}
        </h3>
        : null
    );
