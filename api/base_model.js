import * as actions from 'reframed/actions';
import { forEach, filter, validationMessages, isValid } from 'reframed/index';

/* A BaseModel encapsulates Business Logic.
 * Subclass and add getter functions to calculate derived fields.
**/
export class BaseModel {
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
}
