import {HelloServiceBase, HelloServiceImpl, IocHelloService} from '../service/ioc-services';
import {HelloController} from './hello-controller';
import {HelloIocDirectController, HelloIocInterfaceController} from './hello-ioc-controller';
import {HelloObjectController} from './hello-object-controller';

export default [
    HelloController,
    HelloObjectController,

    // The IOC controllers
    HelloIocDirectController,
    HelloIocInterfaceController,

    // Don't forget to load these services, or IOC won't find them.
    IocHelloService,
    HelloServiceBase,
    HelloServiceImpl
];
