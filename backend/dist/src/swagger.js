import swaggerAutogen from 'swagger-autogen';
var doc = {
    info: {
        title: 'ticketyours API',
        description: 'All RESTAPI LISTED HERE'
    },
    host: process.env.SWAGGER_HOST
};
var outputFile = './src/swagger-output.json';
var routes = [
    './src/app.ts'
];
swaggerAutogen()(outputFile, routes, doc);
