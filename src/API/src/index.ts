import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import helmet from "helmet";

import * as dotenv from "dotenv";
import { sync } from "./data/db";

import { RegisterRoutes } from "./routes";
import swaggerDocument from "./swagger.json";
import { JsonErrorHandler } from "./Middleware/HandlerError";

const app = express();

// define a route handler for the default home page
dotenv.config();
if (!process.env.PORT) {
  console.log("env 'PORT' não configurada");
  process.exit(1);
}

app.use(helmet());
app.use(cors());
app.use(express.json());

// start the Express server
const PORT: number = parseInt(process.env.PORT as string, 10);

(async () => {
  await sync();
})();

const options = {
  explorer: true,
  swagger: "2.0",
};

// Generate by tsoa
RegisterRoutes(app);
app.use(JsonErrorHandler);
app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { swaggerOptions: options })
);
// app.get("/swagger", swaggerUi.setup(swaggerDocument,{ swaggerOptions: options }));

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
