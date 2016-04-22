import {URL, CREATE, READ, UPDATE, DELETE} from './actions';

export function rest(state, action) {
    const {url, ...keys} = state;
    switch (action) {
        case CREATE:
            return post(url, keys);
        case READ:
            return get(url, keys);
        case UPDATE:
            return put(url, keys);
        case DELETE:
            return delete(url, keys);
    }
}

function get(url, keys, options={}) {
    return url.get(keys)
        .set('Access-Control-Allow-Origin', 'http://localhost:8000')
        .set('Content-Type', 'application/x-amz-json-1.0')
        .set('Authorization', 'XXX')
        .set('x-amz-date', '20130315T092054Z')
        .set('x-amz-target', 'DynamoDB_20120810.CreateTable');
}
