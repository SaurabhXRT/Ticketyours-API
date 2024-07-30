import server from "./app.js";
import logger from "./logger/logger.js";
import dotenv from "dotenv-flow";
dotenv.config();
import dotenvFlow from "dotenv-flow";
dotenvFlow.config();
import { initDatabase } from "./PGmodels/init.js";
import { centralDatabase, databaseInitOptions } from "./config/dbconfig.js";
import swaggerUi from "swagger-ui-express";
// import swaggerSpec from './swagger.js';
//import swaggerDocument from './swagger-output.json';
//swagger API docs
(async () => {
  const swaggerDocument = await import('./swagger-output.json', {
    assert: { type: 'json' }
  });

  // Swagger UI setup
  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument.default));
})();

//Asynchronously initialize the database
initDatabase(centralDatabase, databaseInitOptions).catch((err) => {
  logger.error(err, "An error occured while initializing the database");
});

//const PORT = process.env.PORT || 3000;

import { createServer } from "http";
import { Server, Socket } from "socket.io";
const httpServer = createServer(server);

httpServer.listen(process.env.PORT, () => {
  console.log("Server started listening on " + process.env.PORT);
  logger.log("Server started listening on " + process.env.PORT);
});
