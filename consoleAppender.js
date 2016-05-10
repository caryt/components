/** A Log Appender that writes events to the Chrome Developer Console.
 *  Displays objects so they can be browsed and inspected in the console.
 *  Entries are nicely formatted and expandable for easy inspection.
**/
import { forEach } from './functional';

const isLevel = (event, level) =>
    event.level.toString().search(level) !== -1;

/* eslint-disable no-console */
export class ConsoleAppender {
    initialize() {
    }

    style(event) {
        if (isLevel(event, /FATAL/)) {
            return 'color:darkred; font-size:large';
        } else if (isLevel(event, /ERROR/)) {
            return 'color:red';
        } else if (isLevel(event, /WARN/)) {
            return 'color:orange';
        } else if (isLevel(event, /DEBUG/)) {
            return 'color:darkgray';
        } else if (isLevel(event, /INFO/)) {
            return 'color:blue';
        } else if (isLevel(event, /TRACE/)) {
            return 'color:lightgray; font-size:smaller';
        }
        return 'color:black';
    }

    doAppend(event) {
        const level = event.level;
        const obj = event.exception || '';
        const style = this.style(event);
        if (typeof obj === 'string') {
            console.log('%c%s %s %s', `${style}`,
                event.categoryName, event.message, event.exception);
        } else {
            console.groupCollapsed(
                '%c%s %s', style, event.categoryName, event.message);
            if (isLevel(level, /ERROR/)) {
                forEach(obj, (k, v) => console.error('%c%s %o', style, k, v));
            } else if (isLevel(level, /FATAL/)) {
                forEach(obj, (k, v) => console.error('%c%s %o', style, k, v));
            } else if (isLevel(level, /WARN/)) {
                forEach(obj, (k, v) => console.warn('%c%s %o', style, k, v));
            } else if (isLevel(level, /DEBUG/)) {
                forEach(obj, (k, v) => console.debug('%c%s %o', style, k, v));
            } else if (isLevel(level, /INFO/)) {
                forEach(obj, (k, v) => console.info('%c%s %o', style, k, v));
            } else if (isLevel(level, /TRACE/)) {
                forEach(obj, (k, v) => console.trace('%c%s %o', style, k, v));
            } else {
                forEach(obj, (k, v) => console.log('%c%s %o', style, k, v));
            }
            console.groupEnd();
        }
    }

    doClear() {
        console.clear();
    }
}
/* eslint-enable */

