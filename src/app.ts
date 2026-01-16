import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import { swaggerSpecs } from "./config/swagger";
import routes from "./routes";

const app = express();
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(compression());

app.use(express.json());
app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export default app;
