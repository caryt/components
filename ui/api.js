/** These are helpers designed to be used with api/model's.
**/
import React from 'react';
import * as ui from './index';
import { i, dispatch, event } from 'reframed/index';

export class API {
    static Input({ model, id }) {
        return <ui.Input
          id={id}
          label={model.constructor.LABELS[id]}
          value={model[id]}
          onChange={dispatch(model.constructor.CHANGE_FIELD, event)}
        />;
    }

    static Add({ model }) {
        return <ui.Button onClick={dispatch(model.CREATE_MODEL)}>
            {i`Add`}
        </ui.Button>;
    }

    static Save({ model }) {
        return <ui.Button onClick={dispatch(model.constructor.UPDATE_MODEL)}>
            {i`Save`}
        </ui.Button>;
    }

    static Label( {model, id }) {
        return <span>{id}</span>; // FIXME - model.LABELS[id];
    }
}
