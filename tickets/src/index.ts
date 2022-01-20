import mongoose from 'mongoose';
import { app } from './app';


const start = async() => {
    if (!process.env.JWT_KEY){
        throw new Error('NO JWT_KEY IN ENVIRONMENT');
    }

    if (!process.env.MONGO_URI){
        throw new Error('NO MONGO_URI IN ENVIRONMENT');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);    
        console.log('Connected to MongoDb!');
    } catch (error) {
        console.error(error);
    }

    app.listen(3000, async () => {
        console.log('Auth Service on port 3000');
    });
}

start();
