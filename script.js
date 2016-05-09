/** A script is an object that executes a series of actions
**/
export class Script {
    constructor(actions) {
        this.actions = actions;
    }
    run() {
        this.actions.forEach(action =>
            action && action.apply()
        );
    }
}
