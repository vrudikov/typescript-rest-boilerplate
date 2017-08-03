import {GET, Path, PathParam} from 'typescript-rest';
import {SimpleHello, SimpleHelloType} from '../models/simple-model';

/**
 * This is a demo operation to show how to use typescript-rest library.
 */
@Path('/hello-objects')
export class HelloObjectController {

    /**
     * Send a list of objects with greeting message.
     * @return Array<SimpleHello> simple array of objects
     */
    @GET
    sayArrayObjectHello(): Array<SimpleHello> {
        return [
            new SimpleHello('1'),
            new SimpleHello('2')
        ];
    }

    /**
     * Send a list of typed objects with greeting message.
     * @param name The name that will receive our greeting message
     * @return Array<SimpleHelloType> array of simple hello object
     */
    @Path(':name/types')
    @GET
    saySimpleHelloTypes(@PathParam('name') name: string): Array<SimpleHelloType> {
        return [
            new SimpleHello(name + '1'),
            new SimpleHello(name + '2')
        ];
    }

    /**
     * Send a list of typed objects with greeting message.
     * @param name The name that will receive our greeting message
     * @param typeName The typeName that will receive our greeting message
     * @return SimpleHelloType simple hello object
     */
    @Path(':name/types/:typeName')
    @GET
    saySimpleHelloType(@PathParam('name') name: string, @PathParam('typeName') typeName: string): SimpleHelloType {
        return new SimpleHello(name + '_' + typeName);
    }

    /**
     * Send a object with greeting message.
     * @param name The name that will receive our greeting message
     * @return SimpleHello simple hello object
     */
    @Path(':name')
    @GET
    sayObjectHello(@PathParam('name') name: string): SimpleHello {
        return new SimpleHello(name);
    }

    /**
     * Send a list of objects with greeting message wrapped in Promise
     * @param name The name that will receive our greeting message
     * @return Array<SimpleHello> simple array of objects
     */
    @Path(':name/promises')
    @GET
    sayArrayObjectPromiseHello(@PathParam('name') name: string): Promise<Array<SimpleHello>> {
        return new Promise((resolve, reject) => {
            resolve([
                new SimpleHello(name + '1'),
                new SimpleHello(name + '2')
            ]);
        });
    }

    /**
     * Send a object with greeting message wrapped in Promise
     * @param name The name that will receive our greeting message
     * @param promiseName The promiseName that will receive our greeting message
     * @return SimpleHello simple hello object
     */
    @Path(':name/promises/:promiseName')
    @GET
    sayObjectPromiseHello(@PathParam('name') name: string, @PathParam('promiseName') promiseName: string): Promise<SimpleHello> {
        return new Promise((resolve, reject) => {
            resolve(new SimpleHello(name + '_' + promiseName));
        });
    }
}
