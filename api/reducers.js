import {
    HTTP_GET, HTTP_PUT, HTTP_POST, HTTP_DELETE, // HTTP methods for REST
    CREATE, READ, UPDATE, DELETE, // CRUD methods for a Model
    CHANGE_MODEL, CHANGE_FIELD,
    LIST, POPULATE, // CRUD methods for a List
    NONE,
} from 'reframed/actions';
import { filter } from 'reframed/index';

function get(url, keys, completed) {
    const result = url.get(keys)
        .set('Content-Type', 'application/json');
    result.completed = completed;
    return result;
}

function put(url, keys, completed) {
    const result = url.put(keys)
        .set('Accept', 'application/json')
        .send(keys);
    result.completed = completed;
    return result;
}

function post(url, keys, completed) {
    const result = url.post(keys)
        .set('Content-Type', 'application/json')
        .send(keys);
    result.completed = completed;
    return result;
}

function del(url, keys, completed) {
    const result = url.delete(keys)
        .set('Content-Type', 'application/json');
    result.completed = completed;
    return result;
}

export function rest(state = {}, action) {
    const { url, completed, resource, ...keys } = state;
    switch (action.type) {
    case HTTP_POST.type:
        return post(url, resource.FIELDS, completed);
    case HTTP_GET.type:
        return get(url, keys, completed);
    case HTTP_PUT.type:
        return put(url, resource.FIELDS, completed);
    case HTTP_DELETE.type:
        return del(url, keys, completed);
    default:
        return state;
    }
}

/** strategy defines the state transitions for each action in the Model.
 *  As these are async actions there is a next action and then
 *  a subsequent action to be called on completion of the action.
 *
 *  This method is solely to isolate this logic into a single place :-)
**/
function strategy(model, action) {
    switch (action.type) {
    case CREATE.type:
        return { action: model.HTTP_POST, completed: model.RELIST };
    case READ.type:
        return { action: model.HTTP_GET, completed: model.CHANGE_MODEL };
    case UPDATE.type:
        return { action: model.HTTP_PUT, completed: model.RELIST };
    case DELETE.type:
        return { action: model.HTTP_DELETE, completed: model.RELIST };
    case LIST.type:
        return { action: model.HTTP_GET, completed: model.POPULATE };
    case POPULATE.type:
        return { action: NONE };
    default:
        return { action: NONE };
    }
}

/** Helper function to spread response fields in custom CHANGE reducers.
 *  If the CHANGE action has an error, it returns initial values
 * otherwise it returns values from the response -- both filtered by FIELDS
 * the next action is set to a null action (to prevent an infinite loop)
 * and any error is propogated to the result.
**/
function spread(state, action) {
    const source = (action.error) ? state : action;
    const keys = Object.keys(state);
    return {
        ...filter(source, field => keys.indexOf(field) > -1),
        action: NONE,
        error: action.error,
    };
}

export function models(state = null, action) {
    const model = state ? state[action.model] : null;
    let newModel;
    switch (action.type) {
    case CHANGE_MODEL.type:
        newModel = {
            ...model,
            ...spread(model.INITIAL_STATE, action),
        };
        break;
    case CHANGE_FIELD.type:
        newModel = {
            ...model,
            [action.id]: action.value,
            validations: null, // Flags that validate() should be re-run.
        };
        break;
    case CREATE.type:
        newModel = {
            ...model,
            ...model.INITIAL_STATE,
            ...strategy(model, CREATE),
        };
        break;
    case READ.type:
        newModel = {
            ...model,
            ...model.INITIAL_STATE,
            id: action.value,
            ...strategy(model, READ),
        };
        break;
    case UPDATE.type:
        newModel = {
            ...model,
            ...strategy(model, UPDATE),
        };
        break;
    case DELETE.type:
        newModel = {
            ...model,
            ...strategy(model, DELETE),
        };
        break;
    case LIST.type:
        newModel = {
            ...model.INITIAL_STATE,
            ...strategy(model, LIST),
        };
        break;
    case POPULATE.type:
        newModel = {
            ...model,
            models: model.reviveList(action.response.body),
            error: action.error,
            ...strategy(model, POPULATE),
        };
        break;
    default:
        return state;
    }
    return {
        ...state,
        ...model.revive(newModel),
    };
}
