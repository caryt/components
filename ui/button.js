import React from 'react';
import 'bootstrap-datepicker';

export const Button = ({ children, className = '', ...props }) =>
    <button className={`btn ${className}`} {...props}>
        {children}
    </button>;
