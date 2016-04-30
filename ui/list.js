import React from 'react';
import { Table } from './table';

export const List = ({ model, header, children }) =>
    <Table header={header}>
        {model.map(children)}
    </Table>;
