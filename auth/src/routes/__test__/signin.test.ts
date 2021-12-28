import request from 'supertest';
import { app } from '../../app';

it('returns a 400 when email is not registered', async () => {
    await request(app)
            .post('/api/users/signin')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(400);
});

it('returns a 400 when incorrect password is given', async () => {
    await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201);

        await request(app)
            .post('/api/users/signin')
            .send({
                email: 'test@test.com',
                password: 'incorrectPassword'
            })
            .expect(400);
});


it('returns a 200 and cookie when correct credentials are given', async () => {
    await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201);

        const response = await request(app)
            .post('/api/users/signin')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(200);

        expect(response.get('Set-Cookie')).toBeDefined();
});


