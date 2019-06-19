/**
 * Simple model class
 */
export class SimpleHello {
    public greeting: string;

    constructor(title: string) {
        this.greeting = title;
    }
}

export interface SimpleHelloType {
    greeting: string;
}
