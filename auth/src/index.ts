import mongoose from 'mongoose';
import { app } from './app';


const start = async() => {
    if (!process.env.JWT_KEY){
        throw new Error('NO JWT_KEY IN ENVIRONMENT');
    }

    try {
        await mongoose.connect('mogodb://auth-mongo-srv:27017/auth');    
        console.log('Connect to MongoDb!');
    } catch (error) {
        console.error(error);
    }

    app.listen(3000, async () => {
        console.log('Auth Service on port 3000');
    });
}

start();
