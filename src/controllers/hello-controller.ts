import {GET, Path, PathParam} from 'typescript-rest';

/**
 * This is a demo operation to show how to use typescript-rest library.
 */
@Path('/hello')
export class HelloController {
    /**
     * Send a greeting message.
     * @param name The name that will receive our greeting message
     */
    @Path(':name')
    @GET
    sayHello(@PathParam('name') name: string): string {
        return 'Hello ' + name;
    }
}
