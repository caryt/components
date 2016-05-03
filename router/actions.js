export const NAVIGATE = { type: 'NAVIGATE' };

/** Create and return a new action that navigates to `path` **/
export const createNavigation = path => (
    { ...NAVIGATE, path }
);
