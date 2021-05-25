import * as http from 'http';
import app from './app';
import config from './config';

// Variables
const port = config.port;

// Declare port to app
app.set('port', port);

// Init server http
const server = http.createServer(app);
server.listen(port);

// Listening event
server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${(addr as any).port}`;
    console.log(`Listening on ${bind}`);
});

export default server;
