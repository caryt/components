import {URL} from 'reframed/index';
import * as CONFIG from 'config/environment';
import React from 'react';
import ReactDOM from 'react-dom';
import * as actions from './actions';
import {rest} from './reducers';

describe('Rest is a RESTful interface to a back-end system.', () => {
    describe('It implements a URL (a Uniform Resource Location) that', () => {

        it('is constructed with a function describing the url', () => {
            const url = new URL(({id}) => `id/${id}`);
            expect(url.url({id: 1})).toEqual('id/1');
        });

        describe('asynchronously it', () => {
            let result;
            beforeEach(done => {
                const url = new URL(({id}) =>
                    `${CONFIG.DATABASE_URL}/id/${id}`);
                url.get({id: 123}).end((error, representation) => {
                    result = {error, representation};
                    done()
                });
            });

            it('GET\'s the resource at the URL', () => {
                expect(result.error).toEqual(null);
                expect(result.representation.id).toEqual('123');
            });
        });
    });

    describe('It implements a RESTful inteface - that', () => {
        let representation;
        beforeEach(done => {
            const url = new URL(({id}) =>
                `${CONFIG.DATABASE_URL}/id/${id}`);
            representation = rest({url, id: '987'}, actions.READ)
                .end((error, result) => {
                    representation = {error, result};
                    done();
                });
        });

        // it('Create\'s a resource', () => {

        // });

        it('Read\'s a resource', () => {
            expect(representation.result.id) //FIXME - Additional expectations needed
                .toEqual('987');
        });

        // it('Update\'s a resource', () => {

        // });

        // it('Delete\'s a resource', () => {

        // });
    });
});
