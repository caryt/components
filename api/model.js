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

    get QUERY_ADD() {
        return 'add';
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
        const ignore = ['models', 'action', 'validations'];
        return filter(this, key =>
            fields.indexOf(key) > -1 && ignore.indexOf(key) === -1
        );
    }

    /** Helper function to spread response fields in custom CHANGE reducers.
     *  If the CHANGE action has an error, it returns initial values
     * otherwise it returns values from the response -- both filtered by FIELDS
     * the next action is set to a null action (to prevent an infinite loop)
     * and any error is propogated to the result.
    **/
    spread(action) {
        const source = (action.error) ? this.INITIAL_STATE : action;
        const keys = Object.keys(this.INITIAL_STATE);
        return {
            ...filter(source, field => keys.indexOf(field) > -1),
            action: actions.NONE,
            error: action.error,
        };
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
        this.HTTP_LINK = actions.create('HTTP_LINK', this);
        this.CREATE = actions.create('CREATE', this);
        this.READ = actions.create('READ', this);
        this.UPDATE = actions.create('UPDATE', this);
        this.DELETE = actions.create('DELETE', this);
        this.CHANGE_MODEL = actions.create('CHANGE_MODEL', this);
        this.CHANGE_FIELD = actions.create('CHANGE_FIELD', this);
        this.LIST = actions.create('LIST', this);
        this.LINK = actions.create('LINK', this);
        this.POPULATE = actions.create('POPULATE', this);
        this.RELIST = this.createNavigation(this.ROUTE);
    }

    /** Returns a new VIEW_LINK action for `rel`.
     *  This can be dispatched to trigger a link in a Collection+JSON object
    **/
    static viewLinkAction(rel) {
        return {
            ...actions.create(actions.VIEW_LINK.type, this),
            rel,
        };
    }

    /** Returns a new LINK action for a `rel`.
     *  This is used internally when dispatching a VIEW_LINK action.
     * It finds the link in the Collection+JSON links collection and includes
     * its URL in the LINK action.
    **/
    linkAction(rel) {
        const link = this.links.find(item => item.rel === rel);
        return {
            ...actions.LINK,
            rel,
            href: (link) ? link.href : undefined,
        };
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

    componentDidMount() {
        this.list();
    }

    componentDidUpdate() {
        // FIXME - This is a horrible hack.
        // FIXME - When deleting or updating a record we RELIST which navigates to the page
        // FIXME - mounting it and triggering componentDidMount which executes a list().
        // FIXME - Adding navigates to the same page (the add URL is page?add) so we need
        // FIXME - to manually trigger the list() - which we do here. Yuck!
        if (this.model.action.type === actions.HTTP_POST.type) {
            this.list();
        }
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

    get isAdding() {
        return (this.model.QUERY_ADD in this.props.location.query);
    }

    render() {
        return (this.isAdding)
            ? this.DETAIL.render()
            : null;
    }
}
