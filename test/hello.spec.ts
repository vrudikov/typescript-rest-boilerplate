'use strict';

import 'mocha';
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
                '/hello-object/:name',
            ]);
            expect(Server.getHttpMethods('/hello/:name')).to.have.members([HttpMethod.GET]);
            expect(Server.getHttpMethods('/hello-object/:name')).to.have.members([HttpMethod.GET]);
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

    describe('/hello-object/:name', () => {
        it('should return the object with field "name" informed for GET requests', (done) => {
            helloRequest('/hello-object/joe', (error: any, response, body) => {
                expect(response.statusCode).to.eq(200);
                expect(JSON.parse(body)).to.eql({greeting:'joe'});
                done();
            });
        });

        it('should return 405 for POST requests', (done) => {
            helloRequest.post({
                body: 'joe',
                url: '/hello-object/joe'
            }, (error, response, body) => {
                expect(response.statusCode).to.eq(405);
                done();
            });
        });
    });
});
