import { Model } from './model';
import * as actions from 'reframed/actions';

/** Collection+JSON is a JSON-based read/write hypermedia-type designed
 *  to support management and querying of simple collections.
 *  See http://amundsen.com/media-types/collection/format/
 *  Also see https://github.com/collection-json/spec
 *
 *  This class extends the Model class to translate the Collection+JSON
 *  representation into a simple mapping:-
 *    Collection+JSON represents its data as:
 *      collection.items.data = [{name: 'field', value: value}...]
 *    Model represents its data as:
 *      {field: value, ...}
**/
export class CollectionPlusJSON extends Model {
    constructor(options) {
        super(options);
        if (options && options.data) {
            // options has `data` attribute: [{name: 'name', value: value},...]
            options.data.forEach(value => {
                this[value.name] = value.value;
            });
            this.href = options.href; // TODO - This may cause a name clash!
        }
    }

    reviveList(models) {
        this.links = models.collection.links;
        // the actual items in Collection+JSON are in models.collection.items
        // as opposed to the superclass `Model` which simply uses
        // a plain {name: value, ...} mapping
        const items = models.collection.items;
        return items.map(item => new this.constructor(item));
    }

    spread(action) {
        // See Model.spread for an explanation of this function
        if (action.error) {
            return super.spread(action);
        }
        // individual items are represented as a collection with one item
        const source = action.collection.items[0];
        const keys = Object.keys(this.INITIAL_STATE);
        return (source)
            ? {
                // Iterate over the [{name: 'name', value: value}, ...] array
                // returning a mapping of the relevant {name: value, ...} fields.
                ...source.data.reduce((res, data) => {
                    if (keys.indexOf(data.name) > -1) {
                        res[data.name] = data.value; // eslint-disable-line no-param-reassign
                    }
                    return res;
                }, {}),

                action: actions.NONE,
                error: action.error,
            }
            : super.spread(action);
    }
}
