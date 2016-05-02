/** These are helpers designed to be used with api/model's.
**/
import React from 'react';
import * as ui from './index';
import { i, dispatch, event, navigateTo } from 'reframed/index';

export class API {
    static Input({ model, id }) {
        const action = dispatch(model.constructor.CHANGE_FIELD, event);
        const lbl = model.constructor.LABELS[id];
        const val = model[id];
        return <ui.Input id={id} label={lbl} value={val} onChange={action} />;
    }

    /** Navigate from List to new Item page.
    **/
    static Add({ model }) {
        const action = dispatch('/users/new', navigateTo);
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
            ? dispatch(model.constructor.CREATE_MODEL)
            : dispatch(model.constructor.UPDATE_MODEL);
        return <ui.Button
          className="btn-primary" onClick={action} disabled={!model.isValid}
        >
            {i`Save`}
        </ui.Button>;
    }

    /** Delete a Model
    **/
    static Delete({ model }) {
        const action = dispatch(model.constructor.DELETE_MODEL);
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
