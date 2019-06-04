'use strict';

import {ApiServer} from './api-server';
import {MongoConnector} from "./mongo-connector";

export const start = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        const mongoConnector = new MongoConnector();
        const apiServer = new ApiServer();

        apiServer.start()
            .then(() => mongoConnector.connect())
            .then(resolve)
            .catch(reject);

        const graceful = () => {
            apiServer.stop()
                .then(() => mongoConnector.disconnect())
                .then(() => process.exit(0));
        };

        // Stop graceful
        process.on('SIGTERM', graceful);
        process.on('SIGINT', graceful);
    });
};
