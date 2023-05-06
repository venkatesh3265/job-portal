import 'express-async-errors';
import express from 'express';
import notFoundMiddleWare from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import dotenv from 'dotenv'
import connectDb from './db/connect.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

import path from 'path';
import cors from 'cors'
dotenv.config()
const app = express();
//app.use(cors())
//routers
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import jobsRoutes from './routes/jobsRoutes.js';
import authenticateUser from './middleware/auth.js'


if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json())
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', authenticateUser, jobsRoutes)


app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});
app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 5000;



const start = async () => {
    try {
        await connectDb(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })

    }
    catch (error) {
        console.log(error);

    }



}

start();