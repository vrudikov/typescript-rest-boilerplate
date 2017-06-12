'use strict';

import { ApiServer } from './server';

export function start(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const apiServer = new ApiServer();
        apiServer.start()
                .then(resolve)
                .catch(reject);

        function graceful() {
            apiServer.stop()
                .then(() => process.exit(0));
        }

        // Stop graceful
        process.on('SIGTERM', graceful);
        process.on('SIGINT', graceful);
    });
}
