import supertest from 'supertest';
import testHelper from '../../scripts/test-helper';

const { server } = require('../../src/app.js');

const mockRequest = supertest(server);
const API_STUB = '/api/v1/';

afterEach(testHelper.afterEach);

describe('app module', () => {

  it('supertest should exist', () => {
    expect(supertest);
  });

  it('server should exist', () => {
    expect(server);
  });

  it('should get [] for initial request to GET bands', () => {

    return mockRequest
      .get(API_STUB + '/bands')
      .then(results => {
        expect(JSON.parse(results.text)).toEqual([]);
      }).catch(err => fail(err));
  });

  it('should get populated list after creating', () => {

    return mockRequest
      .get(API_STUB + '/bands')
      .then(results => JSON.parse(results.text))
      .then(bands => expect(bands.length).toBe(0))
      .catch(fail);
  });

  it('should get error 404 if unfound id', () => {

    

  });
});