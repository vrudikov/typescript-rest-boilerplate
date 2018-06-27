# TODO
- JWT tokens for security. Try to integrate typescript-rest-jwt(https://github.com/jacob-ebey/typescript-rest-jwt). Issue-proposal(https://github.com/thiagobustamante/typescript-rest/issues/43)
- Decorator role-based security. Scopes: controller and method.
    We could work with JWT tokens. Decrypt token, take authorities from token
    and check if user has an authority
    Example:
    ```typescript
    @Secured('ADMIN,USER')
    @Path('/hello')
    export class HelloController {
        /**
         * Send a greeting message.
         * @param name The name that will receive our greeting message
         */
        @Secured('ADMIN')
        @Path(':name')
        @GET
        sayHello(@PathParam('name') name: string): string {
            return 'Hello ' + name;
        }
    }
    ```
- MongoDB connection example. I have implementation, need to push here

# Initial setup
```
npm install
```

## Swagger Docs Generation

```
npm run swagger
```

# Project run
```
npm start
```

## Start project in cluster
```
npm start:cluster
```

## Test

```
npm run test
```

### Test with coverage reports:

```
npm run test:coverage
```

The coverage report will be saved under ```./coverage``` folder.

## Generate Docs

```
npm run doc
```

The project documentation will be saved under ```./doc``` folder.
