/* Definitions for the general-purpose RESTful calls (POST, GET, PUT, DELETE)
    actions that can be ampped to many Database calls and RESTful methods.
*/
export const POST = { type: 'POST' };
export const GET = { type: 'GET' };
export const PUT = { type: 'PUT' };
export const DELETE = { type: 'DELETE' };

/** Create and return a new action for a model **/
export const create = (type, model) => (
    { type: `${type}_${model.name}`, model: model.name }
);

