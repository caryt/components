import React from 'react';
import {deepFreeze} from './deepFreeze';
import renderer from 'react-dom';

export function reduce(reducer, before, action) {
    return reducer(deepFreeze(before), action);
}

export const $ = selector =>
    document.querySelector(selector);

export const renderPage = Page =>
    renderer.render(<Page/>, $('#root'));