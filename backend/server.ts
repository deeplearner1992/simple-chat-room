import express from 'express';
// import {Request,Response} from 'express';
import path from 'path';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import bodyParser from 'body-parser';
// import cors from 'cors';

const app = express();
const server = new http.Server(app);
const io = new SocketIO(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

// app.get('/',function(req:Request,res:Response){
//     res.end("Hello World");
// })

io.on('connection', function (socket) {
    console.log(`A user connected: ${socket.id}`);

    socket.on('new-apple', (msg) => {
        console.log(msg);
    });

    socket.on('test', async (data) => {
        /* You can do whatever who like when you receive the data */
        console.log(data)
        io.emit("receive", data);
    });

    socket.on('my message', (msg) => {
        io.emit('my broadcast', `serveraaa: ${msg}`);
        console.log('message: ' + msg);
      });
});

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

// Get main page
app.get('/', function (req: express.Request, res: express.Response) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// Create static folders
app.use(express.static(path.join(__dirname, "public")));

app.get('/send', (req: express.Request, res: express.Response) => {
    // logic of adding apple.
    io.emit("new-apple", "Congratulations! New Apple Created!");
    res.json({ updated: 1 });
});

app.post('/message', async (req: express.Request, res: express.Response) => {
    // logic of adding apple.
    // const { message } = req.body;
    console.log(req.body)
    io.emit("receive", req.body.message);
    res.end("Hello World");
});

const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});