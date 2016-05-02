import * as actions from 'reframed/actions';
import { dispatch, navigateTo, filter, forEach } from 'reframed/index';
/* A BaseModel encapsulates Business Logic.
 * Subclass and add getter functions to calculate derived fields.
**/

class BaseModel {
    constructor(props) {
        forEach(props, (key, value) => { this[key] = value; });
    }

    /** INITIAL_STATE defines the inital values for all fields in the model.
     *  This method must be extended in subclasses.
    **/
    static get INITIAL_STATE() {
        return {
            id: '',
            action: actions.NONE,
        };
    }

    /** LABELS defines the display labels for all fields in the model.
     *  This method must be overridden in subclasses.
    **/
    static get LABELS() {
        return {};
    }

    /** SCHEMA defines the validations applied to each field in the model.
     *  This method must be overridden in subclasses.
    **/
    static get SCHEMA() {
        return {};
    }

    /** Returns `true` if this is a new model, i.e. one that is being created
     *  and hasn't yet been saved to the server.
    **/
    get isNew() {
        return (this.id === '');
    }

    validate() {
        return {};
    }

    get isValid() {
        const validate = this.validate();
        for (const item in validate) {
            if (!validate[item].valid) {
                return false;
            }
        }
        return true;
    }

    static revive(state) {
        return new this(state);
    }

    static reviveList(models) {
        return models.map(model => this.revive(model));
    }
}

/* A Model encapsulates Business Logic and are typically used in reducers that
 * return state from an external API.
 *
 * Subclass and add getter functions to calculate derived fields.
 * Reducers will return Model instances rather than simple mappings.
**/
export class Model extends BaseModel {

    /** strategy defines the state transitions for each action in the Model.
     *  As these are async actions there is a next action and then
     *  a subsequent action to be called on completion of the action.
     *
     *  This method is solely to isolate this logic into a single place :-)
    **/
    static strategy(action) {
        switch (action.type) {
        case this.CREATE_MODEL.type:
            return { action: actions.CREATE };
        case this.READ_MODEL.type:
            return { action: actions.READ, completed: this.CHANGE_MODEL };
        case this.UPDATE_MODEL.type:
            return { action: actions.UPDATE };
        case this.DELETE_MODEL.type:
            return { action: actions.DELETE };
        case this.LIST_MODELS.type:
            return { action: actions.READ, completed: this.POPULATE_MODELS };
        case this.POPULATE_MODELS.type:
            return { action: actions.NONE };
        default:
            return { action: actions.NONE };
        }
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

    static get CHANGE_FIELD() {
        return actions.create(`CHANGE_${this.name}_FIELD`);
    }

    static get LIST_MODELS() {
        return actions.create(`LIST_${this.name}s`);
    }

    static get POPULATE_MODELS() {
        return actions.create(`POPULATE_${this.name}s`);
    }

    static reduce(state = this.INITIAL_STATE, action) {
        switch (action.type) {
        case this.CHANGE_MODEL.type:
            return this.revive({
                ...state,
                ...this.spread(action),
            });
        case this.CHANGE_FIELD.type:
            return this.revive({
                ...state,
                [action.id]: action.value,
            });
        case this.CREATE_MODEL.type:
            return this.revive({
                ...state,
                ...this.INITIAL_STATE,
                ...this.strategy(this.CREATE_MODEL),
            });
        case this.READ_MODEL.type:
            return this.revive({
                ...state,
                ...this.INITIAL_STATE,
                id: action.value,
                ...this.strategy(this.READ_MODEL),
            });
        case this.UPDATE_MODEL.type:
            return this.revive({
                ...state,
                ...this.strategy(this.UPDATE_MODEL),
            });
        case this.DELETE_MODEL.type:
            return this.revive({
                ...state,
                ...this.strategy(this.DELETE_MODEL),
            });
        default:
            return this.revive(state);
        }
    }

    /** Helper function to spread response fields in custom CHANGE_xxx reducers.
     *  If the CHANGE action has an error, it returns initial values
     * otherwise it returns values from the response -- both filtered by FIELDS
     * the next action is set to a null action (to prevent an infinite loop)
     * and any error is propogated to the result.
    **/
    static spread(action) {
        const source = (action.error) ? this.INITIAL_STATE : action;
        const keys = Object.keys(this.INITIAL_STATE);
        return {
            ...filter(source, field => keys.indexOf(field) > -1),
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

    static reduceList(state = this.INITIAL_LIST_STATE, action) {
        switch (action.type) {
        case this.LIST_MODELS.type:
            return {
                ...state,
                ...this.strategy(this.LIST_MODELS),
            };
        case this.POPULATE_MODELS.type:
            return {
                ...state,
                models: this.reviveList(action.response.body),
                ...this.strategy(this.POPULATE_MODELS),
                error: action.error,
            };
        default:
            return state;
        }
    }
}

