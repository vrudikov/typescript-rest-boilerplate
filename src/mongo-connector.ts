import {config} from 'dotenv';
import * as mongoose from 'mongoose';
import {Connection, ConnectionOptions} from 'mongoose';

/**
 * @author val.rudi
 */
export class MongoConnector {
    private mongoConnection: Connection;

    constructor() {
        /**
         * Load environment variables from .env file, where API keys and passwords are configured.
         */
        config({path: '.env'});

        // (mongoose as any).Promise = require('bluebird');
        (mongoose as any).Promise = global.Promise;
    }

    /**
     * Initiate connection to MongoDB
     * @returns {Promise<any>}
     */
    public connect(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            // mongoose.connection.once('open', function() {
            //     console.log('MongoDB event open');
            //     console.log('MongoDB connected [%s]', process.env.MONGODB_URI);
            //
            //     mongoose.connection.on('connected', () => {
            //         console.log('MongoDB event connected');
            //     });
            //
            //     mongoose.connection.on('disconnected', () => {
            //         console.log('MongoDB event disconnected');
            //     });
            //
            //     mongoose.connection.on('reconnected', () => {
            //         console.log('MongoDB event reconnected');
            //     });
            //
            //     mongoose.connection.on('error', (err) => {
            //         console.log('MongoDB event error: ' + err);
            //     });
            //
            //     return resolve();
            // });

            const options: ConnectionOptions = {
                keepAlive: true,
                useMongoClient: true,
                // promiseLibrary: require('bluebird')
            };
            this.mongoConnection = mongoose.connection;
            mongoose.connect(process.env.MONGODB_URI, options).then(() => {
                const indexOfA = process.env.MONGODB_URI.indexOf('@');
                const db = indexOfA !== -1 ?
                    process.env.MONGODB_URI.substring(0, 10) + '!_:_!' + process.env.MONGODB_URI.substring(indexOfA) :
                    process.env.MONGODB_URI;
                console.log('MongoDB connected [%s]', db);
                resolve();
            }).catch(reject);
        });
    }

    /**
     * Disconnects from MongoDB
     * @returns {Promise<any>}
     */
    public disconnect(): Promise<any> {
        return this.mongoConnection.close();
    }

    private initializeConnection() {
        const options = {
            server: {socketOptions: {keepAlive: 1}},
            // promiseLibrary: require('bluebird')
        };
        this.mongoConnection = mongoose.connect(process.env.MONGODB_URI, options).connection;
        this.mongoConnection
            .on('error', console.log)
            .on('disconnected', this.initializeConnection)
            .once('open', () => {
                console.log(`Connected to MongoDB server ${process.env.MONGODB_URI}`);
            });
    }
}
