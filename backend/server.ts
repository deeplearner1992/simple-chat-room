import express from "express";
// import {Request,Response} from 'express';
import path from "path";
import http from "http";
import { Server as SocketIO } from "socket.io";
import bodyParser from "body-parser";
import mysql from "mysql2";
// import cors from 'cors';

// connecting Database
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "testdb",
});

console.log(connection);

const app = express();
const server = new http.Server(app);
const io = new SocketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// app.get('/',function(req:Request,res:Response){
//     res.end("Hello World");
// })

io.on("connection", function (socket) {
  socket.join("myRandomChatRoomId");
  console.log(`A user connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("my message", (msg) => {
    console.log("message: " + msg);
    io.emit("my broadcast", `server: ${msg}`);
  });

  socket.on("join", (roomName) => {
    console.log("join: " + roomName);
    socket.join(roomName);
  });

  socket.on("message", ({ message, roomName }, callback) => {
    console.log("message: " + message + " in " + roomName);

    // generate data to send to receivers
    const outgoingMessage = {
      name: socket.id,
      id: socket.id,
      message,
    };
    // send socket to all in room except sender
    socket.to(roomName).emit("message", outgoingMessage);
    callback({
      status: "ok",
    });
    // send to all including sender
    // io.to(roomName).emit("message", message);
  });
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Get main page
app.get("/", function (req: express.Request, res: express.Response) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Create static folders
app.use(express.static(path.join(__dirname, "public")));

app.get("/send", (req: express.Request, res: express.Response) => {
  // logic of adding apple.
  io.emit("new-apple", "Congratulations! New Apple Created!");
  res.json({ updated: 1 });
});

app.post("/message", async (req: express.Request, res: express.Response) => {
  // logic of adding apple.
  // const { message } = req.body;
  console.log(req.body);
  io.emit("receive", req.body.message);
  res.end("Hello World");
});

app.get("/users", async (req, res) => {
  try {
    const data = await connection.promise().query(`SELECT *  from users;`);
    res.status(202).json({
      users: data[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, password } = req.body;
    const insertId = await connection.promise().query(
      `INSERT INTO users (name, password) 
          VALUES (?, ?)`,
      [name, password]
    );
    res.status(202).json({
      message: "User Created",
      insertId: insertId,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.get("/messages", async (req, res) => {
  try {
    const data = await connection
      .promise()
      .query(
        `SELECT messages.id, name, message FROM messages LEFT JOIN users ON messages.user_id = users.id;`
      );
    res.status(202).json({
      users: data[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.post("/messages", async (req, res) => {
  try {
    const { message, user_id } = req.body;
    const insertId = await connection.promise().query(
      `INSERT INTO messages (message, user_id) 
          VALUES (?, ?)`,
      [message, user_id]
    );
    res.status(202).json({
      message: "Message Created",
      insertId: insertId,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
