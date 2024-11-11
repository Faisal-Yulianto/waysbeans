import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import authRouter from './src/router/authRoutes';
import profileRouter from './src/router/profileRoutes';
import productRouter from './src/router/productRoutes';
import corsOptions from "./src/libs/cors";
import cors from "cors"


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use('/api/auth', authRouter);
app.use('/api', profileRouter);
app.use('/api',productRouter)

app.listen(port, () => {corsOptions
  console.log(`[server]: Server is running at http://localhost:${port}`);
});