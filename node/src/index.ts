import http from 'node:http';
import express, { Response } from 'express';
import './config/logging';
import { loggingHandler } from './middleware/logging.middleware';
import { corsHandler } from './middleware/cors.middleware';
import { routeNotFound } from './middleware/routeNotFound';
import { server } from './config/config';

export const app = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
    logging.log('----------------------------------------');
    logging.info('Initializing API');
    logging.log('----------------------------------------');
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    logging.log('----------------------------------------');
    logging.info('Logging & Configuration');
    logging.log('----------------------------------------');
    app.use(loggingHandler);
    app.use(corsHandler);

    logging.log('----------------------------------------');
    logging.log('Define Controller Routing');
    logging.log('----------------------------------------');
    app.get('/main/healthcheck', (res: Response) => {
        return res.status(200).json({ hello: 'world!' });
    });

    logging.log('----------------------------------------');
    logging.log('Define Routing Error');
    logging.log('----------------------------------------');
    app.use(routeNotFound);

    logging.log('----------------------------------------');
    logging.log('Starting Server');
    logging.log('----------------------------------------');
    httpServer = http.createServer(app);
    httpServer.listen(server.SERVER_PORT, () => {
        logging.log('----------------------------------------');
        logging.log(`Server started on ${server.SERVER_HOSTNAME}:${server.SERVER_PORT}`);
        logging.log('----------------------------------------');
    });
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();

process.on('beforeExit', function (code) {
    Shutdown(() => console.log(code));
    return console.log(`Process to exit with code ${code}`);
});
