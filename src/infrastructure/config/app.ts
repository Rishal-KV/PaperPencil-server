import express, { urlencoded } from 'express'
import cors from 'cors'
import studentRoute from '../routes/studentRoute';
import instructorRouter from '../routes/instructorRoute';
import adminRoute from '../routes/adminRoute';
import cookieParser from 'cookie-parser';
import {initializeSocket } from './socket';
import http  from 'http'



export const createServer = () =>{
    try {
        
        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({extended:true}));
        app.use(cookieParser())
        
        app.use(cors({
            origin:'http://localhost:5173',
            methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials:true
        }))
        app.use('/',studentRoute);
        app.use('/instructor',instructorRouter);
        app.use('/admin',adminRoute);
       
        return app
    } catch (error:any) {
         console.log(error.message);
    }
}