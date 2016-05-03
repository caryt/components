import { URL } from 'reframed/index';
import * as CONFIG from 'config/environment';
import * as actions from './actions';
import { rest } from './reducers';

describe('Resource is a RESTful interface to a back-end system.', () => {
    describe('It implements a URL (a Uniform Resource Location) that', () => {
        it('is constructed with a function describing the url', () => {
            const url = new URL(({ id }) => `id/${id}`);
            expect(url.url({ id: 1 })).toEqual('id/1');
        });

        describe('asynchronously it', () => {
            let result;
            beforeEach(done => {
                const url = new URL(({ id }) =>
                    `${CONFIG.DATABASE}/id/${id}`);
                url.get({ id: 123 }).end((error, representation) => {
                    result = { error, representation };
                    done();
                });
            });

            it('GET\'s the resource at the URL', () => {
                expect(result.error).toEqual(null);
                expect(result.representation.body.id).toEqual('123');
            });
        });
    });

    describe('It implements a RESTful inteface - that', () => {
        let representation;
        beforeEach(done => {
            const url = new URL(({ id }) =>
                `${CONFIG.DATABASE}/id/${id}`);
            representation = rest({ url, id: '987' }, actions.GET)
                .end((error, result) => {
                    representation = { error, result };
                    done();
                });
        });

        // it('Create\'s a resource', () => {

        // });

        it('GET\'s a resource', () => {
            expect(representation.result.body.id) // FIXME - Additional expectations needed
                .toEqual('987');
        });

        // it('Update\'s a resource', () => {

        // });

        // it('Delete\'s a resource', () => {

        // });
    });
});
