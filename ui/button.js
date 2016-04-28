import React from 'react';
import 'bootstrap-datepicker';
import { Icon } from './icon';
import { config } from 'reframed/index';

export const Button = ({ children, ...props }) =>
    <button className="btn" {...props}>
        {children}
    </button>;
