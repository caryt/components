/** These are helpers designed to be used with api/model's.
**/
import React from 'react';
import * as ui from './index';
import { i, dispatch, event } from 'reframed/index';
import * as actions from 'reframed/actions';

export class API {
    static Input({ model, id }) {
        const action = dispatch(model.CHANGE_FIELD, event);
        const lbl = model.LABELS[id];
        const val = model[id];
        return <ui.Input id={id} label={lbl} value={val} onChange={action} />;
    }

    /** Navigate from List to new Item page.
    **/
    static Add({ model }) {
        const action = dispatch(model.createNavigation('/users/new'));
        return <ui.Button className="btn-primary" onClick={action}>
            {i`Add`}
        </ui.Button>;
    }

    /** Either:-
     *  Create a new Model, or
     *  Save changes to an existing Model.
    **/
    static Save({ model }) {
        const action = (model.isNew)
            ? dispatch(model.CREATE)
            : dispatch(model.UPDATE);
        return <ui.Button
          className="btn-primary" onClick={action} disabled={!model.isValid}
        >
            {i`Save`}
        </ui.Button>;
    }

    /** Delete a Model
    **/
    static Delete({ model }) {
        const action = dispatch(model.DELETE);
        return (model.isNew)
            ? null
            : <ui.Button className="btn-danger" onClick={action}>
                {i`Delete`}
            </ui.Button>;
    }

    static Label({ model, id }) {
        return <span>{model.LABELS[id]}</span>;
    }
}
