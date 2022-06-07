'use strict';
const { app } = require('../src/server'); 
const supertest = require('supertest');
const mockRequest = supertest(app);


const { db } = require('../src/models/index.models');


beforeAll(async () => {
  await db.sync();
});

describe('Web server', () => {


  it('Should respond with 404 status on an invalid route', async () => {
    const response = await mockRequest.get('/abc');
    expect(response.status).toBe(404);
  });
  it('Should respond with 404 status on an invalid method', async () => {
    const response = await mockRequest.delete('/food');
    expect(response.status).toBe(404);
  });

  // test if can add a food 
  it('can add a food', async () => {
    const response = await mockRequest.post('/food').send({
      name: 'pizaa',
      kind: 'salty'
    });
    expect(response.status).toBe(201);
  });

  // test if can get all foods 
  it('can get all foods', async () => {
    const response = await mockRequest.get('/food');
    expect(response.status).toBe(200);

  });

  // test if can get one food
  it('can get one food', async () => {
    const response = await mockRequest.get('/food/1');
    expect(response.status).toBe(200);
  });

  // test if can update a food
  it('can update a food', async () => {
    const response = await mockRequest.put('/food/1');
    expect(response.status).toBe(201);
  });
  // test if can delete a food 
  it('can delete a food', async () => {
    const response = await mockRequest.delete('/food/1');
    expect(response.status).toBe(204);
  });
});
// after all the tests are done
afterAll(async () => {
  await db.drop();
});