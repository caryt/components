import React from 'react';
import { Table } from './table';
import { hasPermission } from 'reframed/index';

export const TabularList = ({ list, header, children, ...rest }) =>
    <Table className="list" header={header} {...rest}>
        {list.map(child => children(child, header))}
    </Table>;

export const OrderedList = ({ list, header, children, ...rest }) =>
    <div className="list">
        {header}
        <ol {...rest}>
            {list.map(child => children(child, header))}
        </ol>
    </div>;

export const UnorderedList = ({ list, header, children, ...rest }) =>
    <div className="list">
        {header}
        <ul {...rest}>
            {list.map(child => children(child, header))}
        </ul>
    </div>;

export const Li = ({ permission = null, ...props }) => (
    (hasPermission(permission))
        ? <li { ...props } />
        : null
    );
