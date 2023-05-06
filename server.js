import 'express-async-errors';
import express from 'express';
import notFoundMiddleWare from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import dotenv from 'dotenv'
import connectDb from './db/connect.js';
import cors from 'cors'
dotenv.config()
const app = express();
//app.use(cors())
//routers
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import jobsRoutes from './routes/jobsRoutes.js';
import authenticateUser from './middleware/auth.js'


if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}
app.use(express.json())
console.log('test'); 
app.get('/api/v1',(req,res)=>{
    res.send(`Api`)
})

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/jobs',authenticateUser,jobsRoutes)

app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 5000;



const start = async () =>{
 try{
  await connectDb(process.env.MONGO_URL)
  app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})

 }
 catch(error) {
    console.log(error);

 }



}

start();