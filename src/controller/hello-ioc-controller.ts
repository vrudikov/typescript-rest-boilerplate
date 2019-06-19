import {Inject} from 'typescript-ioc';
import {GET, Path, PathParam} from 'typescript-rest';

import {HelloServiceBase, IocHelloService} from '../service/ioc-services';

/**
 * These are demo operations to show how to use typescript-rest library with typescript-ioc.
 */
@Path('/hello-ioc-direct')
export class HelloIocDirectController {
    // Here we use property injection.
    @Inject
    private injectedService: IocHelloService;

    /**
     * Send a greeting message.
     * @param name The name that will receive our greeting message
     */
    @Path(':name')
    @GET
    public sayHello(@PathParam('name') name: string) {
        return this.injectedService.sayHello(name);
    }
}

/**
 * These are demo operations to show how to use typescript-rest library with typescript-ioc.
 */
@Path('/hello-ioc-base')
export class HelloIocInterfaceController {
    // Here we use constructor injection.
    private injectedService: HelloServiceBase;

    constructor(@Inject injectedService: HelloServiceBase) {
        this.injectedService = injectedService;
    }

    /**
     * Send a greeting message.
     * @param name The name that will receive our greeting message
     */
    @Path(':name')
    @GET
    public sayHello(@PathParam('name') name: string) {
        return this.injectedService.sayHello(name);
    }
}
