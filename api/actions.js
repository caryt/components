/* Definitions for the general-purpose RESTful calls (POST, GET, PUT, DELETE)
    actions that can be mapped to many Database calls and RESTful methods.
*/
export const HTTP_POST = { type: 'HTTP_POST' };
export const HTTP_GET = { type: 'HTTP_GET' };
export const HTTP_PUT = { type: 'HTTP_PUT' };
export const HTTP_DELETE = { type: 'HTTP_DELETE' };

export const CREATE = { type: 'CREATE' };
export const READ = { type: 'READ' };
export const UPDATE = { type: 'UPDATE' };
export const DELETE = { type: 'DELETE' };

export const CHANGE_MODEL = { type: 'CHANGE_MODEL' };
export const CHANGE_FIELD = { type: 'CHANGE_FIELD' };
export const NAVIGATE_MODEL = { type: 'NAVIGATE_MODEL' };

export const LIST = { type: 'LIST' };
export const POPULATE = { type: 'POPULATE' };

/** Create and return a new action for a model **/
export const create = (type, model) => (
    { type, model: model.constructor.name }
);

