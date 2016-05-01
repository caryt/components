import * as actions from 'reframed/actions';
import { filter, forEach } from 'reframed/functional';

/* A Model encapsulates Business Logic and are typically used in reducers that
 * return state from an external API.
 *
 * Subclass and add getter functions to calculate derived fields.
 * Reducers can return Model instances rather than simple mappings.
**/
export class Model {
    constructor(props) {
        forEach(props, (key, value) => { this[key] = value; });
    }

    static get CREATE_MODEL() {
        return actions.create(`CREATE_${this.name}`);
    }

    static get READ_MODEL() {
        return actions.create(`READ_${this.name}`);
    }

    static get UPDATE_MODEL() {
        return actions.create(`UPDATE_${this.name}`);
    }

    static get DELETE_MODEL() {
        return actions.create(`DELETE_${this.name}`);
    }

    static get CHANGE_MODEL() {
        return actions.create(`CHANGE_${this.name}`);
    }

    static get LIST_MODELS() {
        return actions.create(`LIST_${this.name}s`);
    }

    static get POPULATE_MODELS() {
        return actions.create(`POPULATE_${this.name}s`);
    }

    /** FIELDS are the data (i.e. non-key) fields returned from an API call.
     *  This method must be overridden in subclasses.
    **/
    static get FIELDS() {
        return [];
    }

    /** INITIAL_STATE defines the inital values for all fields in the model.
     *  This method must be overridden in subclasses.
    **/
    static get INITIAL_STATE() {
        return {};
    }

    static reduce(state = this.INITIAL_STATE, action) {
        switch (action.type) {
        case this.CHANGE_MODEL.type:
            return new this({
                ...state,
                ...this.spread(action),
            });
        case this.READ_MODEL.type:
            return new this({
                ...state,
                ...this.INITIAL_STATE,
                id: action.value,
                action: actions.READ,
                completed: this.CHANGE_MODEL,
            });
        case this.UPDATE_MODEL.type:
            return new this({
                ...state,
                ...this.INITIAL_STATE,
                id: action.value,
                action: actions.UPDATE,
            });
        case this.DELETE_MODEL.type:
            return new this({
                ...state,
                ...this.INITIAL_STATE,
                id: action.value,
                action: actions.READ,
            });
        case this.CREATE_MODEL.type:
            return new this({
                ...state,
                ...this.INITIAL_STATE,
                action: actions.NONE,
            });
        default:
            return state;
        }
    }

    /** Helper function to spread response fields in custom CHANGE_xxx reducers.
     *  If the CHANGE action has an error, it returns initial values
     * otherwise it returns values from the response -- both filtered by FIELDS
     * the next action is set to a null action (to prevent an infinite loop)
     * and any error is propogated to the result.
    **/
    static spread(action) {
        return {
            ...filter((action.error) ? this.INITIAL_STATE : action, field =>
                this.FIELDS.indexOf(field) > -1
            ),
            action: actions.NONE,
            error: action.error,
        };
    }

    static get INITIAL_LIST_STATE() {
        return {
            models: [],
            action: actions.NONE,
        };
    }

    static reviveList(models) {
        return models.map(model => new this(model));
    }

    static reduceList(state = this.INITIAL_LIST_STATE, action) {
        switch (action.type) {
        case this.LIST_MODELS.type:
            return {
                ...state,
                action: actions.READ,
                completed: this.POPULATE_MODELS,
            };
        case this.POPULATE_MODELS.type:
            return {
                ...state,
                models: this.reviveList(action.response.body),
                action: actions.NONE,
                error: action.error,
            };
        default:
            return state;
        }
    }
}
