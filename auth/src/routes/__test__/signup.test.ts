import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async() => {
    return request(app)
            .post('/api/users/signup/')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201);
});


it('returns a 400 with invalid parameters ', async() => {
    await request(app)
            .post('/api/users/signup/')
            .send({
                email: 'test.com',
                password: 'password'
            })
            .expect(400);
    
    await request(app)
            .post('/api/users/signup/')
            .send({
                email: 'pest.com',
                password: 'prd'
            })
            .expect(400);
});


it('returns a 400 with missing parameters ', async() => {
    await request(app)
            .post('/api/users/signup/')
            .send({
                email: 'test.com'
            })
            .expect(400);
    
    await request(app)
    .post('/api/users/signup/')
    .send({
        password: 'dsfdfrefr'
    })
    .expect(400);
    
    await request(app)
            .post('/api/users/signup/')
            .send({})
            .expect(400);
});


it('does not allow duplicate emails', async() =>{
    await request(app)
    .post('/api/users/signup/')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201);

    await request(app)
        .post('/api/users/signup/')
        .send({
            email: 'test@test.com',
            password: 'different'
        })
        .expect(400);
});


it('sets a cookie after successful signup', async()=>{
    const response = await request(app)
        .post('/api/users/signup/')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});
