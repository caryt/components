import React from 'react';
import { Link as RawLink } from 'react-router';
import { hasPermission } from 'reframed/index';

export const Link = ({ to, className = null, permission = null, children }) => (
    (hasPermission(permission))
        ? <RawLink to={to} className={className} activeClassName="active">
            {children}
        </RawLink>
        : null
    );
