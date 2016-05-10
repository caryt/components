import { deepFreeze } from './deepFreeze';
import { config } from 'reframed/index';

/** This is used to test reducers.
 *  It recursively freezes the before state so that
 * any mutations will throw exceptions - as reducers should be pure functions.
**/
export function reduce(reducer, before, action) {
    return reducer(deepFreeze(before), action);
}

/** This is used to test rendering. It return the DOM element
 *  for the passed selector - which can be a CSS rule
**/
export const $ = selector =>
    document.querySelector(selector);

/** This renders component into a web page (replacing any existing component)
  * It is the same rendering logic used by the application to render pages.
**/
export const testComponent = component => {
    const { renderer, root } = config;
    renderer.render(component, root);
};
