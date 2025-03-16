import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './database/connectDB.js';
import dotenv from 'dotenv'
import authRoute from './Routes/auth.js';
import userRoute from './Routes/user.js';
import doctorRoute from './Routes/doctor.js';
import adminRoute from './Routes/admin.js';
import bookingRoute from './Routes/booking.js';
import chatRoute from './Routes/chat.js';
import notificationRoute from './Routes/notification.js';
import walletRoute from './Routes/wallet.js';
import reviewrRoute from './Routes/review.js';
import feedbackRoute from './Routes/feedback.js';
import { Server } from 'socket.io';


dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["#"],
  },
});

const corsOptions = {
  origin: true,
};

app.get('/', (req, res)=> {
  res.send('API is working')
})

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/doctors', doctorRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/bookings', bookingRoute);
app.use('/api/v1/chat', chatRoute);
app.use('/api/v1/notification', notificationRoute);
app.use('/api/v1/wallet', walletRoute);
app.use('/api/v1/reviews', reviewrRoute);
app.use('/api/v1/contact', feedbackRoute);


io.on("connection", (socket) => {

  console.log('A user is connected');

  socket.on('join', (user) => {
    if (user && user._id) {
      socket.join(user._id);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user is disconnected');
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});




server.listen(port, (err) => {
  if (err) {
    console.error('Error in starting the server:', err);
  } else {
    connectDB();
    console.log('Server is running on port:' + port);
}
});
