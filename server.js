// server.js - simple Express + Socket.IO backend
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory stores
const posts = [
  { id: 1, title: "Organic pest control tips", author: "AgriExpert", content: "Use neem-based solutions..." },
  { id: 2, title: "Efficient irrigation", author: "Admin", content: "Drip irrigation saves water..." }
];
const faqs = [
  { q: "How to improve soil fertility?", a: "Use compost and rotate crops." },
  { q: "Where to get certified seeds?", a: "Contact local agricultural extension office." }
];

// REST endpoints
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/posts', (req, res) => {
  const { title, author, content } = req.body;
  const id = posts.length ? posts[posts.length-1].id + 1 : 1;
  const p = { id, title, author, content };
  posts.push(p);
  res.json(p);
});

app.get('/api/faqs', (req, res) => {
  res.json(faqs);
});

// Serve multi-page frontend
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/farmers', (req, res) => res.sendFile(path.join(__dirname, 'public', 'farmers.html')));
app.get('/experts', (req, res) => res.sendFile(path.join(__dirname, 'public', 'experts.html')));
app.get('/chat', (req, res) => res.sendFile(path.join(__dirname, 'public', 'chat.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));

// Real-time chat with Socket.IO
io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('joinRoom', ({room, name}) => {
    socket.join(room);
    socket.to(room).emit('systemMessage', {msg: `${name} joined the room.`});
  });

  socket.on('chatMessage', (data) => {
    // data = { room, name, message }
    io.to(data.room).emit('chatMessage', { name: data.name, message: data.message, ts: Date.now() });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});
