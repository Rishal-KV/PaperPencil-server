import { createServer } from "./infrastructure/config/app";
import dotenv from 'dotenv';
import connectDB from "./infrastructure/config/connectDB";
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '.env') });
console.log('process.env.jwt_secret:', process.env.jwt_secret);
const startServer = async()=>{
    try {
       
        connectDB()
       
        const app = createServer();
       
        app?.listen(3000,()=>{
            console.log("server is running");
            
        })
         
    } catch (error) {
        console.log(error)
    }
}

startServer()