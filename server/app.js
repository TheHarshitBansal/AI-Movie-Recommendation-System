import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.routes.js';
import paymentRoutes from './routes/razorpay.routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware.js';
import connectionToDB from './config/dbConnection.js';
import { getResults } from './controllers/ai.controller.js';
import { contact } from './controllers/miscellaneous.controller.js';
dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
    origin: "https://streamvibe12.vercel.app",
    credentials:true,
  };
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(morgan('combined'));

app.options("*", cors());

app.use('/api/user', userRoutes)
app.use('/api/payment', paymentRoutes)
app.post('/api/searchAI', getResults)
app.post('/api/contact', contact)

app.all('*', (req,res)=>{
    res.status(404).send("Page not found")
})

app.use(errorMiddleware);

app.listen(PORT, async() => {
    await connectionToDB();
    console.log(`Server is running on port ${PORT}`);
});