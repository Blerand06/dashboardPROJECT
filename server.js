const express = require('express');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('Connected!');
});

// Assigning a variable to the MongoDB folder
const connectDB = require('./server/database/connection');

// Port configuration via ".env" file with dotenv
dotenv.config({ path: '.env' });
const PORT = process.env.PORT || 3002;

// Setting path to assets for efficiency
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/images')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

// Loading cookie parser
app.use(cookieParser());

// Body parser set
app.use(bodyparser.urlencoded({ extended: true }));

// Setting the view engine
app.set('view engine', 'ejs');

// JSON converter into objects
app.use(express.json());

// Loading routers
app.use('/', require('./server/routes/router'));
app.use('/auth', require('./server/routes/authRoutes'));
app.use('/order', require('./server/routes/orderRoutes'));
app.use('/userlist', require('./server/routes/userListRoutes'));
app.use('/message', require('./server/routes/messageRoutes'));

// Connecting the PORT
server.listen(PORT, () => {
  connectDB();
  console.log(`You've been connected to PORT: ${PORT}`);
});
