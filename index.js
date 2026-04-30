import express from 'express';
import dotenv from 'dotenv';
import errorHandler from './middleware/error.middleware.js';
import { router } from './routes/health.routes.js';
import userRoute from './routes/users.routes.js';
import { authRoute } from './routes/auth.routes.js';
import { quizRoute } from './routes/quizes.routes.js';
import { attemptRoute } from './routes/attempt.route.js';


dotenv.config();
const app = express();
app.use(express.json());


app.use('/', router);
app.use('/auth', authRoute)
app.use('/quiz', quizRoute)
app.use('/users', userRoute);
app.use('/attempt', attemptRoute);


app.use(errorHandler);
const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
    console.log(`Port listening in Port no : ${PORT}`);
})