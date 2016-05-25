import React from 'react';
import { Table } from './table';

export const TabularList = ({ list, header, children, ...rest }) =>
    <Table className="list" header={header} {...rest}>
        {list.map(children)}
    </Table>;

export const OrderedList = ({ list, header, children, ...rest }) =>
    <div className="list">
        {header}
        <ol {...rest}>
            {list.map(children)}
        </ol>
    </div>;

export const UnorderedList = ({ list, header, children, ...rest }) =>
    <div className="list">
        {header}
        <ul {...rest}>
            {list.map(children)}
        </ul>
    </div>;
