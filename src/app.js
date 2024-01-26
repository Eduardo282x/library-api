import express from "express";
import morgan from "morgan";
import cors from "cors";

import authenticationRouter from './routes/authentication.route';
import usersRouter from './routes/users.route';
import bookstestRouter from './routes/books.route';
import libraryRouter from './routes/library.route';

const app = express();

// Settings
app.set("port", 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/authentication',authenticationRouter);
app.use('/api/users',usersRouter);
app.use('/api/booksthesis',bookstestRouter);
app.use('/api/library',libraryRouter);

export default app;