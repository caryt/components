import React from 'react';
import { Link as RawLink } from 'react-router';

export const Link = ({ to, className = null, children }) =>
    <RawLink to={to} className={className} activeClassName="active">
        {children}
    </RawLink>;
