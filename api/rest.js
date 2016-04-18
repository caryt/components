import React from 'react';
import * as Async from 'components/async/component';
import {rest} from './reducers'
import {resource as resource_dispatcher} from 'components/index';
import {MOCK_NETWORK_DELAY} from 'config/environment';

/** Interface to describe a RESTful API.
 *  @param {Object} %0.base The base URL for this API.
 *  @param {String} %0.endpoint The relative path for this API endpoint. (Can contain placeholders eg {id}).
 *  @param {Action} %0.completed The action to dispatach once the method has completed.
 *  @param {Object} %0.resource An object used to populate the placeholders in the endpoint.
 *
 *  e.g. <Rest base={URL('example.com')} endpoint='id/{id}' completed=UPDATE resource={id:1}/>
 *  returns an object that can be used to perform RESTful operations on example.com/id/1.
**/
export const Rest = ({base, endpoint, completed, resource}) =>
    <Async.Component
        reducer = {rest}
        state = {{url: base.addPath(endpoint), ...resource}}
        dispatcher = {resource_dispatcher}
        duration = {MOCK_NETWORK_DELAY}
        completed = {completed}
    />;
