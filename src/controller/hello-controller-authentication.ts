import { GET, Path, PathParam, Security } from 'typescript-rest';

/**
 * This is a demo operation to show how to use typescript-rest library.
 */
@Path('/hello-auth')
export class HelloAuthenticationController {
    /**
     * Send a greeting message.
     * @param name The name that will receive our greeting message
     */
    @Path(':name')
    @GET
    @Security()
    public sayHello(@PathParam('name') name: string): string {
        return 'Hello ' + name;
    }

    /**
     * Send a greeting message.
     * @param name The name that will receive our greeting message
     */
    @Path('secondAuth/:name')
    @GET
    @Security('*', 'secondAuthenticator')
    public sayHelloSecondAuth(@PathParam('name') name: string): string {
        return 'Hello ' + name;
    }
}
