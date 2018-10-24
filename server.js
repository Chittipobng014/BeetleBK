import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from './core/logger/app-logger';
import morgan from 'morgan';
import config from './core/config/config.dev';
import apiRouter from './routes/apiRouter';

const app = express();
const port = config.serverPort;

logger.stream = {
    write: (message, encoding) => {
        logger.info(message);
    }
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev", { "stream": logger.stream }));
app.use('/api', apiRouter);

app.listen(port, () => {
    logger.info('server started - ', port);
});