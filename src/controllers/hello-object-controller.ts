import {GET, Path, PathParam} from 'typescript-rest';
import {SimpleHello} from '../models/simple-model';

/**
 * This is a demo operation to show how to use typescript-rest library.
 */
@Path('/hello-object')
export class HelloObjectController {

    /**
     * Send a object with greeting message.
     * @param name The name that will receive our greeting message
     */
    @Path(':name')
    @GET
    sayObjectHello(@PathParam('name') name: string): SimpleHello {
        return new SimpleHello(name);
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
