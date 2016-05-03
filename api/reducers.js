import { POST, GET, PUT, DELETE } from './actions';

function get(url, keys, completed, options = {}) {
    const result = url.get(keys)
        .set('Content-Type', 'application/json');
    result.completed = completed;
    return result;
}

function put(url, keys, completed, options = {}) {
    const result = url.put(keys)
        .set('Accept', 'application/json')
        .send(keys);
    result.completed = completed;
    return result;
}

function post(url, keys, completed, options = {}) {
    const result = url.post(keys)
        .set('Content-Type', 'application/json');
    // TODO - Need to set form data too
    result.completed = completed;
    return result;
}

function del(url, keys, completed, options = {}) {
    const result = url.delete(keys)
        .set('Content-Type', 'application/json');
    result.completed = completed;
    return result;
}

export function rest(state, action) {
    const { url, completed, ...keys } = state;
    switch (action.type) {
    case POST.type:
        return post(url, keys, completed);
    case GET.type:
        return get(url, keys, completed);
    case PUT.type:
        return put(url, keys, completed);
    case DELETE.type:
        return del(url, keys, completed);
    default:
        throw 'Unknown action';
    }
}

