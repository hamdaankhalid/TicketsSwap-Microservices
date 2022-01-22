import request from 'supertest';
import { app } from '../../app';
import { Ticket} from '../../models/ticket';

it('has a  route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

    expect(response.status).not.toEqual(404);
});

it('can not be accessed if user is not signed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

    expect(response.status).toEqual(401);
});

it('returns non 401 status if user is signed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({});

    expect(response.status).not.toEqual(401);
});


it('returns an error if an invalid title is provided', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: "",
            price: 10
        });
    
    expect(response.status).toEqual(400);

    const noTitle = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            price: 10
        });
    
    expect(noTitle.status).toEqual(400);
});

it('returns an error if an invalid price is provided', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: "validtitle",
            price: -10
        });
    
    expect(response.status).toEqual(400);

    const noPrice = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: "validtitle",
        });
    
    expect(noPrice.status).toEqual(400);
});

it('creates a ticket with valid inputs', async () => {
   let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: "validtitle",
        price: 10
    });
    
    tickets = await Ticket.find({});
    
    expect(tickets.length).toEqual(1);
    expect(response.status).toEqual(201);
    expect(tickets[0].price).toEqual(10);
});