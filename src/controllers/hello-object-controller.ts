import { GET, Path, PathParam } from 'typescript-rest';
import { SimpleHello } from '../models/simple-model';

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
    sayObjectHello( @PathParam('name') name: string): SimpleHello {
        return new SimpleHello(name);
    }
}
