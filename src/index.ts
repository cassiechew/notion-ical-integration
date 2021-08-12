import express, { Express } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import eventsRouter from './routes/events'


dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use("/", eventsRouter)

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));