import React from 'react';
import { store, doDispatch, action } from 'reframed/index';
import * as actions from 'reframed/actions';

/** A Page provides some helper methods to construct pages that display Models
**/
export class Page extends React.Component {
    componentWillMount() {
        const ModelClass = this.constructor.MODEL;
        if (store) {
            if (!this.models) {
                this.models = {};
            }
            this.models[ModelClass.name] = new ModelClass();
        }
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

    get models() {
        return store && store.state.models;
    }

    set models(value) {
        if (store) {
            store.state.models = value;
        }
    }

    get model() {
        const ModelClass = this.constructor.MODEL;
        return this.models[ModelClass.name];
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
