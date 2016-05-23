import React from 'react';
import { Table } from './table';

export const TabularList = ({ list, header, children }) =>
    <Table className="list" header={header}>
        {list.map(children)}
    </Table>;

export const OrderedList = ({ list, header, children }) =>
    <div className="list">
        {header}
        <ol>
            {list.map(children)}
        </ol>
    </div>;

export const UnorderedList = ({ list, header, children }) =>
    <div className="list">
        {header}
        <ul>
            {list.map(children)}
        </ul>
    </div>;
