/** These are helpers designed to be used with api/model's.
**/
import React from 'react';
import * as ui from './index';
import { i, dispatch, event } from 'reframed/index';

export class API {
    static Input({ model, id }) {
        const action = dispatch(model.constructor.CHANGE_FIELD, event);
        const lbl = model.constructor.LABELS[id];
        const val = model[id];
        return <ui.Input id={id} label={lbl} value={val} onChange={action} />;
    }

    static Add({ model }) {
        const action = dispatch(model.CREATE_MODEL);
        return <ui.Button className="btn-primary" onClick={action}>
            {i`Add`}
        </ui.Button>;
    }

    static Save({ model }) {
        const action = dispatch(model.constructor.UPDATE_MODEL);
        return <ui.Button className="btn-primary" onClick={action}>
            {i`Save`}
        </ui.Button>;
    }

    static Delete({ model }) {
        const action = dispatch(model.constructor.DELETE_MODEL);
        return <ui.Button className="btn-danger" onClick={action}>
            {i`Delete`}
        </ui.Button>;
    }

    static Label({ model, id }) {
        return <span>{model.LABELS[id]}</span>;
    }
}
