'use strict';

import { start } from './start';

start()
    .catch((err) => {
        // tslint:disable-next-line:no-console
        console.error(`Error starting server: ${err.message}`);
        process.exit(-1);
    });
