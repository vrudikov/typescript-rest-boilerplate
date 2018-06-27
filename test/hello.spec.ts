'use strict';

import {describe, before, after, it} from 'mocha';
import * as chai from 'chai';
import * as request from 'request';
import { ApiServer } from '../src/api-server';
import {Server, HttpMethod} from 'typescript-rest';

const expect = chai.expect;

const apiServer: ApiServer = new ApiServer();
const helloRequest: request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>
                 = request.defaults({baseUrl: `http://localhost:${apiServer.PORT}`});

describe('Hello Controller Tests', () => {

    before(() => {
        return apiServer.start();
    });

    after(() => {
        return apiServer.stop();
    });

    describe('The Rest Server', () => {
        it('should provide a catalog containing the exposed paths', () => {
            expect(Server.getPaths()).to.include.members([
                '/hello/:name',
                '/hello-objects/:name',
                '/hello-ioc-direct/:name',
                '/hello-ioc-base/:name',
            ]);
            expect(Server.getHttpMethods('/hello/:name')).to.have.members([HttpMethod.GET]);
            expect(Server.getHttpMethods('/hello-objects/:name')).to.have.members([HttpMethod.GET]);
        });
    });

    describe('/hello/:name', () => {
        it('should return the name informed for GET requests', (done) => {
            helloRequest('/hello/joe', (error: any, response, body) => {
                expect(response.statusCode).to.eq(200);
                expect(body).to.eq('Hello joe');
                done();
            });
        });

        it('should return 405 for POST requests', (done) => {
            helloRequest.post({
                body: 'joe',
                url: '/hello/joe'
            }, (error, response, body) => {
                expect(response.statusCode).to.eq(405);
                done();
            });
        });
    });

    describe('/hello-objects/:name', () => {
        it('should return the object with field "name" informed for GET requests', (done) => {
            helloRequest('/hello-objects/joe', (error: any, response, body) => {
                expect(response.statusCode).to.eq(200);
                expect(JSON.parse(body)).to.eql({greeting:'joe'});
                done();
            });
        });

        it('should return 405 for POST requests', (done) => {
            helloRequest.post({
                body: 'joe',
                url: '/hello-objects/joe'
            }, (error, response, body) => {
                expect(response.statusCode).to.eq(405);
                done();
            });
        });
    });

    describe('/hello-ioc-direct/:name', () => {
        it('should return the name informed for GET requests', (done) => {
            helloRequest('/hello-ioc-direct/mike', (error: any, response, body) => {
                expect(response.statusCode).to.eq(200);
                expect(body).to.eq('Hello, mike');
                done();
            });
        });

        it('should return 405 for POST requests', (done) => {
            helloRequest.post({
                body: 'mike',
                url: '/hello-ioc-direct/mike'
            }, (error, response, body) => {
                expect(response.statusCode).to.eq(405);
                done();
            });
        });
    });

    describe('/hello-ioc-base/:name', () => {
        it('should return the name informed for GET requests', (done) => {
            helloRequest('/hello-ioc-base/sam', (error: any, response, body) => {
                expect(response.statusCode).to.eq(200);
                expect(body).to.eq('Hi sam!');
                done();
            });
        });

        it('should return 405 for POST requests', (done) => {
            helloRequest.post({
                body: 'sam',
                url: '/hello-ioc-base/sam'
            }, (error, response, body) => {
                expect(response.statusCode).to.eq(405);
                done();
            });
        });
    });
});
