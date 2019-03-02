import { Provides } from 'typescript-ioc';

/**
 * To be used as an "interface", in case you want to be able to use different implementations.
 */
export abstract class HelloServiceBase {
  abstract sayHello(name: string): string;
}

/**
 * The implementation of the interface.
 */
@Provides(HelloServiceBase)
export class HelloServiceImpl implements HelloServiceBase {
  sayHello(name: string): string {
    return 'Hi ' + name + '!';
  }
}

/**
 * To be directly injected.
 */
export class IocHelloService {
  sayHello(name: string) {
    return 'Hello, ' + name;
  }
}
