import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { ConnectOptions } from 'mongoose';
import jwt from 'jsonwebtoken';
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
    var signin: () => string[];
}

global.signin = () =>{
    // build jwt payload. { id, email }
    const payload = {
        email: 'testuser@email.com',
        id: "1234"
    }
    // create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // build session object { jwt: MY_JWT }
    const session = { jwt: token };

    // tur session to json
    const sessionJSON = JSON.stringify(session);

    // encode json to base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return the string with encoded data

    return [`session=${base64}`];
};


