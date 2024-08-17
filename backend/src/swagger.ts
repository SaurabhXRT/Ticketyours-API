import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'ticketyours API',
    description: 'All RESTAPI LISTED HERE',
  },
  host: 'localhost:3000',
};

const outputFile = './src/swagger-output.json';
const routes = ['./src/app.ts'];

swaggerAutogen()(outputFile, routes, doc);

