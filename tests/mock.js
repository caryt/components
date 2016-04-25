export const error = code => {
    throw new Error(code);
};

export const notFound = () => error(404);

export const url = (base, endpoint, result) => ({
    pattern: `${base}/${endpoint}`,
    fixtures: () => null,
    get: match => result(match),
});
