import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(bodyParser.json());

app.use('/users', userRoutes);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});

export default app;