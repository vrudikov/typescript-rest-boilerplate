# Initial setup
```
npm install
```

# Project run
```
npm start
```

# Swagger Docs Generation

### Swagger tool installation(global)
```
npm install typescript-rest-swagger -g
```

### Usage
```
swaggerGen -c ./swagger-config.json
```

### Non-global Usage
```
node ./node_modules/.bin/swaggerGen -c ./swagger-config.json
```