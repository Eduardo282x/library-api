import express from "express";
import morgan from "morgan";
import cors from "cors";

import authenticationRouter from './routes/authentication.route';

const app = express();

// Settings
app.set("port", 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/authentication',authenticationRouter);

export default app;