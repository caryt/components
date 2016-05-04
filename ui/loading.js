import React from 'react';
import { Icon } from './icon';

export const Loading = ({ action }) => (
    (action && action.type)
        ? <Icon fa="spinner" className="fa-spin" />
        : null
);
