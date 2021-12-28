import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { ConnectOptions } from 'mongoose';
import { app } from '../app';
import request from 'supertest';

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'abc';
    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions);
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for( let collection of collections){
        await collection.deleteMany({});
    }

});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

declare global {
    var signin: () => Promise<string[]>;
}

global.signin = async () =>{
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app).post('/api/users/signup')
                            .send({
                                email, password
                            }).expect(201);
    
    const cookie = response.get('Set-Cookie');

    return cookie;
}


