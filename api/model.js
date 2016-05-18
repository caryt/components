import { BaseModel } from './base_model';
import * as actions from 'reframed/actions';
import { filter } from 'reframed/index';

/* A Model encapsulates Business Logic and are typically used in reducers that
 * return state from an external API.
 *
 * Subclass and add getter functions to calculate derived fields.
 * Reducers will return Model instances rather than simple mappings.
**/
export class Model extends BaseModel {
    constructor(...args) {
        super(...args);
        this.CREATE = actions.create('CREATE', this);
        this.READ = actions.create('READ', this);
        this.UPDATE = actions.create('UPDATE', this);
        this.DELETE = actions.create('DELETE', this);
        this.CHANGE_MODEL = actions.create('CHANGE_MODEL', this);
        this.CHANGE_FIELD = actions.create('CHANGE_FIELD', this);
        this.LIST = actions.create('LIST', this);
        this.POPULATE = actions.create('POPULATE', this);
        this.RELIST = this.createNavigation(this.ROUTE);
    }

    createNavigation(path) {
        return { ...actions.NAVIGATE_MODEL, path };
    }

    /** strategy defines the state transitions for each action in the Model.
     *  As these are async actions there is a next action and then
     *  a subsequent action to be called on completion of the action.
     *
     *  This method is solely to isolate this logic into a single place :-)
    **/
    strategy(action) {
        switch (action.type) {
        case actions.CREATE.type:
            return { action: actions.HTTP_POST, completed: this.RELIST };
        case actions.READ.type:
            return { action: actions.HTTP_GET, completed: this.CHANGE_MODEL };
        case actions.UPDATE.type:
            return { action: actions.HTTP_PUT, completed: this.RELIST };
        case actions.DELETE.type:
            return { action: actions.HTTP_DELETE, completed: this.RELIST };
        case actions.LIST.type:
            return { action: actions.HTTP_GET, completed: this.POPULATE };
        default:
            return { action: actions.NONE };
        }
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
