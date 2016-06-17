/** HTTP Content-Type Header **/
const contentType = ['Content-Type', 'application/json'];

/** HTTP Authorization Header **/
const authorization = auth => ['Authorization', `Bearer ${auth}`];

export function get(url, keys, auth, completed) {
    const result = url.get(keys)
        .set(...contentType)
        .set(...authorization(auth));
    result.completed = completed;
    return result;
}

export function put(url, keys, auth, completed) {
    const result = url.put(keys)
        .set(...contentType)
        .set(...authorization(auth))
        .send(keys);
    result.completed = completed;
    return result;
}

export function post(url, keys, auth, completed) {
    const result = url.post(keys)
        .set(...contentType)
        .set(...authorization(auth))
        .send(keys);
    result.completed = completed;
    return result;
}

export function del(url, keys, auth, completed) {
    const result = url.delete(keys)
        .set(...contentType)
        .set(...authorization(auth));
    result.completed = completed;
    return result;
}
