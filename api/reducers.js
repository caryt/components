import { URL, CREATE, READ, UPDATE, DELETE } from './actions';

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
