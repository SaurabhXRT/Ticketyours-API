import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'ticketyours API',
    description: 'All RESTAPI LISTED HERE',
  },
  host: process.env.SWAGGER_HOST,
};

const outputFile = './src/swagger-output.json';
const routes = ['./src/app.ts'];

swaggerAutogen()(outputFile, routes, doc);

