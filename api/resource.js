import React from 'react';
import * as Async from 'reframed/async/component';
import { rest } from './reducers';
import { resource as resourceDispatcher, config } from 'reframed/index';

/** Interface to describe a RESTful API.
 *  @param {Object} %0.base The base URL for this API.
 *  @param {String} %0.endpoint The relative path for this API endpoint.
 *  	(Can contain placeholders eg {id}).
 *  @param {Object} %0.resource An object used to populate the placeholders in the endpoint.
 *
 *  e.g. <Rest base={URL('example.com')} endpoint='id/{id}' completed=UPDATE resource={id:1}/>
 *  returns an object that can be used to perform RESTful operations on example.com/id/1.
**/
export const Resource = ({ base, endpoint, resource }) =>
    <Async.Component
      reducer={rest}
      state={{ url: base.addPath(endpoint), ...resource }}
      dispatcher={resourceDispatcher}
      duration={config.MOCK_NETWORK_DELAY}
    />;
