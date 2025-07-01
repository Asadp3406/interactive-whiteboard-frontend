const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

let whiteboardState = [];
let codeState = {
    html: '<h1>Hello Whiteboard!</h1>',
    css: 'h1 { color: blue; }',
    javascript: 'console.log("Welcome to live coding!");'
};

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.emit('initialWhiteboardState', whiteboardState);
    socket.emit('initialCodeState', codeState);

    socket.on('draw', (drawingData) => {
        whiteboardState.push(drawingData);
        socket.broadcast.emit('draw', drawingData);
    });

    socket.on('clearWhiteboard', () => {
        whiteboardState = [];
        socket.broadcast.emit('clearWhiteboard');
    });

    socket.on('codeChange', (newCodeState) => {
        codeState = { ...codeState, ...newCodeState };
        socket.broadcast.emit('codeChange', newCodeState);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
});