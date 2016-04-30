import React from 'react';
import { Table } from './table';

export const List = ({ model, children }) =>
    <Table>
        {model.map(children)}
    </Table>;
