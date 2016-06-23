import * as actions from 'reframed/actions';
import * as restful from './restful';

export function rest(state = {}, action) {
    const { url, base, completed, resource, authorization } = state;
    const args = [authorization, completed];
    switch (action.type) {
    case actions.HTTP_POST.type:
        return restful.post(url, resource.FIELDS, ...args);
    case actions.HTTP_GET.type:
        return restful.get(url, resource, ...args);
    case actions.HTTP_PUT.type:
        return restful.put(url, resource.FIELDS, ...args);
    case actions.HTTP_DELETE.type:
        return restful.del(url, resource, ...args);
    case actions.HTTP_LINK.type:
        return restful.get(base.addPath(action.href), resource, ...args);
    default:
        return state;
    }
}

export function models(state = null, action) {
    function getNewModel(model) {
        switch (action.type) {
        case actions.CHANGE_MODEL.type:
            return { ...model, ...model.spread(action) };
        case actions.CHANGE_FIELD.type:
            return {
                ...model,
                [action.id]: action.value,
                validations: null, // Flags that validate() should be re-run.
            };
        case actions.READ.type:
            return {
                ...model,
                ...model.INITIAL_STATE,
                id: action.value,
                ...model.strategy(action),
            };
        case actions.CREATE.type:
        case actions.UPDATE.type:
        case actions.DELETE.type:
            return { ...model, ...model.strategy(action) };
        case actions.LIST.type:
        case actions.VIEW_LINK.type:
            return { ...model.INITIAL_STATE, ...model.strategy(action) };
        case actions.POPULATE.type:
            return {
                ...model,
                models: (action.error)
                    ? []
                    : model.reviveList(action.response.body),
                error: action.error,
                ...model.strategy(action),
            };
        default:
            return false;
        }
    }

    const model = state ? state[action.model] : null;
    const newModel = getNewModel(model);
    if (newModel) {
        return { ...state, ...model.revive(newModel) };
    }
    return state;
}
