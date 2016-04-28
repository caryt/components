/** Some handy utilities to apply functional methods over objects
 *
**/

/** entries(obj) returns an array of [key, value] items over the objects keys
**/
export const entries = obj =>
        Object.keys(obj).map(key =>
            ([key, obj[key]])
        );

/** map(obj, fn) returns an array by applying fn over each [key, value] in obj
 *  e.g. map({ a:1, b:2 }, (key, value) => `${key}:${value}`))
**/
export const map = (obj, fn) =>
    entries(obj).map(([key, value]) =>
        fn(key, value)
    );

/** forEach(obj, fn) applies fn over each [key, value] in obj
**/
export const forEach = (obj, fn) =>
    entries(obj).forEach(([key, value]) =>
        fn(key, value)
    );

/** filter(obj, fn) returns an object with the key/values filtered by fn.
**/
export const filter = (obj, fn) => {
    const result = {};
    entries(obj).reduce((result, [key, value]) => {
        if (fn(key, value)) {
            result[key] = value;
        }
        return result;
    }, result);
    return result;
};
