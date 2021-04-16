import * as cors from 'cors';
import * as compression from 'compression';
import * as express from 'express';
import * as http from 'http'; // this comes from node
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as path from 'path';
import * as socketIO from 'socket.io';

import routes from './routes';
import './middlewares/passport-strategies';

// we need to attach our express app onto a node http server, and then that server will use socket io
// our app will be enveloped into a bigger server, and we will configure that bigger server will more options than just a simple REST api express app, such as using sockets
const app = express();
const server = new http.Server(app); // wrapping our app in a http server
export const io = new socketIO.Server(server);

// web sockets are all event driven
io.on('connection', (socket: socketIO.Socket) => {
    console.log('A user is connected: ' + socket.id)
}) // we run a callback everytime our connection event is heard

// app.use(helmet());
app.use(compression());
app.use(cors());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(express.static('public'));
app.use(express.json());
app.use(routes);
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')))

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server listening on port: ${port}`));
