import supertest from 'supertest';

const { server } = require('../../src/app.js');

const mockRequest = supertest(server);
const API_STUB = '/api/v1/';

describe('app module', () => {

  it('supertest should exist', () => {
    expect(supertest);
  });

  it('server should exist', () => {
    expect(server);
  });

  it('should get [] for initial request to GET bands', async () => {

    const response = await mockRequest.get(API_STUB + '/bands');

    expect(JSON.parse(response.text)).toEqual([]);

  });

  it('should get populated list after creating', async () => {

    await mockRequest.post(API_STUB + '/bands').send({name : 'The Who'});

    const response = await mockRequest.get(API_STUB + '/bands');

    expect(JSON.parse(response.text).length).toBe(1);
  });

  it('should get error 404 if unfound id', () => {

    

  });
});