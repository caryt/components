import React from 'react';
import * as actions from 'reframed/actions';
import {
  forEach, filter,
  store, doDispatch, action,
  validationMessages, isValid,
} from 'reframed/index';

/* A BaseModel encapsulates Business Logic.
 * Subclass and add getter functions to calculate derived fields.
**/

class BaseModel {
    constructor(options) {
        const props = options || this.INITIAL_STATE;
        forEach(props, (key, value) => { this[key] = value; });
    }

    /** INITIAL_STATE defines the inital values for all fields in the model.
     *  This method must be extended in subclasses.
    **/
    get INITIAL_STATE() {
        return {
            id: '',
            models: [],
            action: actions.NONE,
            validations: [],
        };
    }

    /** LABELS defines the display labels for all fields in the model.
     *  This method must be overridden in subclasses.
    **/
    get LABELS() {
        return {};
    }

    /** SCHEMA defines the validations applied to each field in the model.
     *  This method must be overridden in subclasses.
    **/
    get SCHEMA() {
        return {};
    }

    /** Returns `true` if this is a new model, i.e. one that is being created
     *  and hasn't yet been saved to the server.
    **/
    get isNew() {
        return (this.id === '');
    }

    get isValid() {
        return isValid(this);
    }

    get validationMessages() {
        return validationMessages(this);
    }

    revive(state) {
        return {
            [this.constructor.name]: new this.constructor(state),
        };
    }

    reviveList(models) {
        return models.map(model => new this.constructor(model));
    }

    get FIELDS() {
        const fields = Object.keys(this.INITIAL_STATE);
        const ignore = ['models', 'action'];
        return filter(this, key =>
            fields.indexOf(key) > -1 && ignore.indexOf(key) === -1
        );
    }
}

/* A Model encapsulates Business Logic and are typically used in reducers that
 * return state from an external API.
 *
 * Subclass and add getter functions to calculate derived fields.
 * Reducers will return Model instances rather than simple mappings.
**/
export class Model extends BaseModel {
    constructor(...args) {
        super(...args);
        this.HTTP_GET = actions.create('HTTP_GET', this);
        this.HTTP_PUT = actions.create('HTTP_PUT', this);
        this.HTTP_POST = actions.create('HTTP_POST', this);
        this.HTTP_DELETE = actions.create('HTTP_DELETE', this);
        this.CREATE = actions.create('CREATE', this);
        this.READ = actions.create('READ', this);
        this.UPDATE = actions.create('UPDATE', this);
        this.DELETE = actions.create('DELETE', this);
        this.CHANGE_MODEL = actions.create('CHANGE_MODEL', this);
        this.CHANGE_FIELD = actions.create('CHANGE_FIELD', this);
        this.LIST = actions.create('LIST', this);
        this.POPULATE = actions.create('POPULATE', this);
    }

    createNavigation(path) {
        return { ...actions.NAVIGATE_MODEL, path };
    }
}

/** A Page provides some helper methods to construct pages that display Models
**/
export class Page extends React.Component {
    componentWillMount() {
        const ModelClass = this.constructor.MODEL;
        store.state.models = { [ModelClass.name]: new ModelClass() };
    }

    get model() {
        const ModelClass = this.constructor.MODEL;
        return store.state.models[ModelClass.name];
    }

    list() {
        doDispatch(this.model.LIST, action);
    }

    read() {
        doDispatch(this.model.READ, { action, value: this.props.params.id });
    }

    render() {
        return null;
    }
}
