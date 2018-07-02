import supertest from 'supertest';
import superagent from 'superagent';

const {
  app,
} = require('../../src/app.js');

const mockRequest = supertest(app);
const API_STUB = '/api/v1';

describe('app module', () => {

  it('supertest should exist', () => {
    expect(supertest);
  });

  it('app should exist', () => {
    expect(app);
  });

  it('should get [] for initial request to GET bands', async () => {

    const response = await mockRequest.get(API_STUB + '/bands');
    
    expect(JSON.parse(response.text)).toEqual([]);
  });

  it('should get populated list after creating', async () => {

    let response = await mockRequest.post(API_STUB + '/bands').send({
      name: 'The Who',
    });

    expect(response.body.name).toBe('The Who');

    response = await mockRequest.get(API_STUB + '/bands');

    expect(response.body.length).toBe(1);
  });

  xit('should get error 404 if unfound id', () => {



  });
});