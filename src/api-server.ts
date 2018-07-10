import * as express from 'express';
import { Server } from 'typescript-rest';
import * as http from 'http';
import * as path from 'path';
import * as cors from 'cors';
import controllers from './controllers';
import {AddressInfo} from "net";

export class ApiServer {

    private readonly app: express.Application;
    private server: http.Server = null;
    public PORT: number = +process.env.PORT || 3000;

    constructor() {
        this.app = express();
        this.config();

        Server.useIoC();
        Server.buildServices(this.app, ...controllers);

        // TODO: enable for Swagger generation error
        // Server.loadServices(this.app, 'controllers/*', __dirname);
        Server.swagger(this.app, './dist/swagger.json', '/api-docs', 'localhost:3000', ['http']);
    }

    /**
     * Configure the express app.
     */
    private config(): void {
        // Native Express configuration
        // this.app.use( bodyParser.urlencoded( { extended: false } ) );
        // this.app.use( bodyParser.json( { limit: '1mb' } ) );
        this.app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
        this.app.use(cors());
    }

    /**
     * Start the server
     * @returns {Promise<any>}
     */
    public start(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.server = this.app.listen(this.PORT, (err: any) => {
                if (err) {
                    return reject(err);
                }
                const address = this.server.address() as AddressInfo;
                // TODO: replace with Morgan call
                // tslint:disable-next-line:no-console
                console.log(`Listening to http://localhost:${address.port}`);
                return resolve();
            });
        });

    }

    /**
     * Stop the server (if running).
     * @returns {Promise<boolean>}
     */
    public stop(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (this.server) {
                this.server.close(() => {
                    return resolve(true);
                });
            } else {
                return resolve(true);
            }
        });
    }

}
