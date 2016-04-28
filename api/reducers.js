import { URL, CREATE, READ, UPDATE, DELETE } from './actions';
import { filter } from 'reframed/functional';

export function rest(state, action) {
    const { url, ...keys} = state;
    switch (action) {
    case CREATE:
        return post(url, keys);
    case READ:
        return get(url, keys);
    case UPDATE:
        return put(url, keys);
    case DELETE:
        return delete(url, keys);
    default:
        throw 'Unknown action';
    }
}

function get(url, keys, options = {}) {
    return url.get(keys)
        .set('Content-Type', 'application/json');
}

/** Helper function to spread response fields in custom CHANGE_xxx reducers.
 *  If the CHANGE action has an error, it returns initial values
 * otherwise it returns values from the response -- both filtered by FIELDS
 * the next action is set to a null action (otherwise we get an infinite loop)
 * and any error is propogated to the result.
**/
export const spread = ({ action, FIELDS, INITIAL_STATE }) => ({
    ...filter((action.error) ? INITIAL_STATE : action, field =>
        FIELDS.indexOf(field) > -1
    ),
    action: INITIAL_STATE.action,
    error: action.error,
});
