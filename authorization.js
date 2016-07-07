import jwt_decode from 'jwt-decode'; // eslint-disable-line camelcase

export const authorizationToken = () =>
    sessionStorage.token;

export const setAuthorizationToken = token => {
    sessionStorage.token = token;
};

export const logout = nextState => {
    setAuthorizationToken('');
    nextState.history.replace('/login?redirect=%2f');
    return null;
};

export const checkAuthorization = (nextState, replace) => {
    if (!authorizationToken()) {
        const redirect = encodeURIComponent(nextState.location.pathname);
        replace(`/login?redirect=${redirect}`);
    }
};

const token = field => {
    // WARNING: This doesn't verify the signature (as the front-end can't
    // securely contain the signing secret).
    try {
        const decoded = jwt_decode(authorizationToken());
        return decoded && decoded[field];
    } catch (e) {
        return null;
    }
};

export const usersRole = () =>
    token('role');

export const username = () =>
    token('username');

export let roles = [];

export let permissions = {};

export const addRolesAndPermissions = (appRoles, appPermissions) => {
    roles = appRoles;
    permissions = appPermissions;
};

const roleIndex = role =>
    roles.findIndex(item => item === role);

export const hasPermission = p => {
    const index = roleIndex(usersRole());
    return (p === true) ||
        ((index > -1) && p && (permissions[p][index] === 'Y'));
};

