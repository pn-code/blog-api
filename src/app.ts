import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";

const port = config.get<number>("port");

const app = express();

app.listen(port, async () => {
    logger.info(`Server is running at https://localhost:${3000}.`)
    await connect();
    routes(app);
})