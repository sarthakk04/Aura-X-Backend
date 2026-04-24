import express from 'express';
import dotenv from 'dotenv';
import errorHandler from './middleware/error.middleware.js';
import { router } from './routes/health.routes.js';


dotenv.config();
const app = express();
app.use(express.json());
app.use(router);
app.use(errorHandler);
const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
    console.log(`Port listening in Port no : ${PORT}`);
})