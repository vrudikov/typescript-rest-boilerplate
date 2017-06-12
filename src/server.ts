import * as express from "express";
import { Server } from "typescript-rest";
import * as http from "http";
import controllers from './controllers';

export class ApiServer {

    public app: express.Application;
    public server: http.Server = null;
    public PORT: number = process.env.PORT || 3000;

    constructor() {
        this.app = express();
        Server.buildServices(this.app, ...controllers);
        Server.swagger(this.app, './dist/swagger.json', '/api-docs', 'localhost:3000', ['http']);
        this.config();
    }

    /**
     * Configure the express app.
     */
    private config(): void {
        // Native Express configuration
        // this.app.use( bodyParser.urlencoded( { extended: false } ) );
        // this.app.use( bodyParser.json( { limit: "1mb" } ) );
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
                console.log(`Listening to http://${this.server.address().address}:${this.server.address().port}`);
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