import request from 'superagent';
import { logger } from 'reframed/index';
const log = logger('url');

/** Object representing a URL (Uniform Resource Location)
 *  @example example = new URL('http://example.com')
 *  @example person = new URL(({id}) => `http://example.com/person/{id}`)
**/
export class URL {
    constructor(url) {
        this._url = url;
    }

    url(keys = this, options = {}) {
        return (typeof this._url === 'function')
            ? this._url(keys)
            : this._url;
    }

    /** Constructs a new URL by appending the passed path to the base URL.
     *  @example base = new URL('http://example.com')
     *  @example person = base.addPath({id}) => `person/{id}`)
    **/
    addPath(path) {
        return new URL(keys => [this.url(), path(keys)].join('/'));
    }

    /** GET's the resource at this URL.
    **/
    get(options = {}) {
        const url = this.url(options);
        log.debug('GET', url);
        return request.get(url);
    }

    /** PUT's the resource at this URL.
    **/
    put(options = {}) {
        const url = this.url(options);
        log.debug('PUT', url);
        return request.put(url);
    }

    /** POST's the resource at this URL.
    **/
    post(options = {}) {
        const url = this.url(options);
        log.debug('POST', url);
        return request.post(url);
    }

    /** DELETE's the resource at this URL.
    **/
    delete(options = {}) {
        const url = this.url(options);
        log.debug('DELETE', url);
        return request.delete(url);
    }
}
