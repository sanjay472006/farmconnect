FarmConnect - simple full-stack farming support platform
---------------------------------------------------------

What's included:
- server.js : Express + Socket.IO backend that serves the static frontend and provides simple REST endpoints.
- public/   : frontend static site (multi-page) with real-time chat using Socket.IO.
- package.json : lists dependencies for the backend.
- README : this file.

How to run (Node.js required):
1. Open a terminal in the 'farmconnect' folder.
2. Install dependencies:
   npm install
3. Start the server:
   node server.js
4. Open http://localhost:3000 in your browser.

Notes:
- Data is stored in-memory (simple arrays). Restarting the server clears data.
- This is a starter template: add a database (MongoDB/Postgres) and authentication for production.
