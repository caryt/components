import { CREATE, READ, UPDATE, DELETE } from './actions';
import { filter, forEach } from 'reframed/functional';

export function rest(state, action) {
    const { url, ...keys } = state;
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


/* A Model encapsulates Business Logic and are typically used in reducers that
 * return state from an external API.
 *
 * Subclass and add getter functions to calculate derived fields.
 * Reducers can return Model instances rather than simple mappings.
**/
export class Model {
    constructor(props) {
        forEach(props, (key, value) => { this[key] = value; });
    }

    /** FIELDS are the data (i.e. non-key) fields returned from an API call.
     *  This method must be overridden in subclasses.
    **/
    static get FIELDS() {
        return [];
    }

    /** INITIAL_STATE defines the inital values for all fields in the model.
     *  This method must be overridden in subclasses.
    **/
    static get INITIAL_STATE() {
        return {};
    }

    /** Helper function to spread response fields in custom CHANGE_xxx reducers.
     *  If the CHANGE action has an error, it returns initial values
     * otherwise it returns values from the response -- both filtered by FIELDS
     * the next action is set to a null action (to prevent an infinite loop)
     * and any error is propogated to the result.
    **/
    static spread(action, FIELDS, INITIAL_STATE) {
        return {
            ...filter((action.error) ? INITIAL_STATE : action, field =>
                FIELDS.indexOf(field) > -1
            ),
            action: INITIAL_STATE.action,
            error: action.error,
        };
    }
}
