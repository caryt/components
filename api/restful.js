export function get(url, keys, completed) {
    const result = url.get(keys)
        .set('Content-Type', 'application/json');
    result.completed = completed;
    return result;
}

export function put(url, keys, completed) {
    const result = url.put(keys)
        .set('Accept', 'application/json')
        .send(keys);
    result.completed = completed;
    return result;
}

export function post(url, keys, completed) {
    const result = url.post(keys)
        .set('Content-Type', 'application/json')
        .send(keys);
    result.completed = completed;
    return result;
}

export function del(url, keys, completed) {
    const result = url.delete(keys)
        .set('Content-Type', 'application/json');
    result.completed = completed;
    return result;
}
