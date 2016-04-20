import React from 'react';
import {deepFreeze} from './deepFreeze';
import {config} from 'reframed/index';

export function reduce(reducer, before, action) {
    return reducer(deepFreeze(before), action);
}

export const $ = selector =>
    document.querySelector(selector);

export const testComponent = Component =>
    config.renderer.render(Component, config.root);