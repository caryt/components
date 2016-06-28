/** These are helpers designed to be used with api/model's.
**/
import React from 'react';
import * as ui from './index';
import { i, dispatch, event, hasPermission } from 'reframed/index';

const CREATE = 'create';
const UPDATE = 'update';
const DELETE = 'delete';

const ifPermitted = (operation, model) =>
    model.permission && hasPermission(`${operation}_${model.permission}`);

export class API {
    static Input({ model, id, ...props }) {
        const onChange = dispatch(model.CHANGE_FIELD, event);
        const label = model.LABELS[id];
        const value = model[id];
        const newProps = { ...props, id, label, value, onChange };
        return <ui.Input { ...newProps } />;
    }

    /** Navigate from List to new Item page.
    **/
    static Add({ model }) {
        const url = `${model.ROUTE}?${model.QUERY_ADD}`;
        const action = dispatch(model.createNavigation(url));
        return (ifPermitted(CREATE, model))
            ? <ui.Button className="btn-primary" onClick={action}>
                {i`Add`}
            </ui.Button>
            : null;
    }

    /** Either:-
     *  Create a new Model, or
     *  Save changes to an existing Model.
    **/
    static Save({ model }) {
        const action = (model.isNew)
            ? dispatch(model.CREATE)
            : dispatch(model.UPDATE);
        return (ifPermitted((model.isNew) ? CREATE : UPDATE, model))
            ? <ui.Button
              className="btn-primary" onClick={action} disabled={!model.isValid}
            >
                {i`Save`}
            </ui.Button>
            : null;
    }

    /** Delete a Model
    **/
    static Delete({ model }) {
        const action = dispatch(model.DELETE);
        return (ifPermitted(DELETE, model) && !model.isNew)
            ? <ui.Button className="btn-danger" onClick={action}>
                {i`Delete`}
            </ui.Button>
            : null;
    }

    static Label({ model, id }) {
        return <span>{model.LABELS[id]}</span>;
    }
}
