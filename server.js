import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import auth from './routes/api/auth';
import logs from './routes/api/logs';
import courses from './routes/api/courses';

// startup config
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

// db connect
const db = process.env.MONGO_URI;
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(err));

// middleware
app.use(express.json());


// routes
app.use('/api/logs', logs);
app.use('/api/auth', auth);
app.use('/api/courses', courses);


app.listen(PORT, () => console.log(`Running on port ${PORT}`));
