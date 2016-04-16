import {deepFreeze} from './deepFreeze';

export function reduce(reducer, before, action) {
    return reducer(deepFreeze(before), action);
}

export const $ = selector =>
    document.querySelector(selector);