import React from 'react';
import { Table } from './table';

export const List = ({ list, header, children }) =>
    <Table header={header}>
        {list.map(children)}
    </Table>;
