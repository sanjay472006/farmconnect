const socket = io();

const joinBtn = document.getElementById('join');
const chatDiv = document.getElementById('chat');
const messagesDiv = document.getElementById('messages');
const roomInput = document.getElementById('room');
const nameInput = document.getElementById('name');
const msgForm = document.getElementById('msgForm');
const msgInput = document.getElementById('msg');

joinBtn.addEventListener('click', () => {
  const room = roomInput.value.trim() || 'general';
  const name = nameInput.value.trim() || 'anonymous';
  socket.emit('joinRoom', { room, name });
  chatDiv.classList.remove('hidden');
  addSystem('Joined room: ' + room);
  chatDiv.dataset.room = room;
});

function addSystem(text) {
  const p = document.createElement('div');
  p.innerHTML = '<small><em>' + text + '</em></small>';
  messagesDiv.appendChild(p);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

socket.on('systemMessage', (d) => {
  addSystem(d.msg);
});

socket.on('chatMessage', (d) => {
  const p = document.createElement('div');
  const time = new Date(d.ts).toLocaleTimeString();
  p.innerHTML = '<strong>' + escapeHtml(d.name) + '</strong> <small>(' + time + ')</small>: ' + escapeHtml(d.message);
  messagesDiv.appendChild(p);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

msgForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const room = chatDiv.dataset.room || 'general';
  const name = nameInput.value.trim() || 'anonymous';
  const message = msgInput.value.trim();
  if(!message) return;
  socket.emit('chatMessage', { room, name, message });
  msgInput.value = '';
});

function escapeHtml(s){ return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }
