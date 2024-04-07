

import mongoose from 'mongoose'

export const connectDB = () => {
     try {
          const mongoURI = process.env.db_url as string
          console.log(process.env.db_url)
          
          mongoose.connect(mongoURI)
          console.log("Database connected");
          
     } catch (error) {
          console.error('An error occurred while connecting the mongoDB:', error);
     }
}
export default connectDB