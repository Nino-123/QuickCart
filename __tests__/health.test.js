// Health check test for Express app

const request = require('supertest');
const app = require('../src/app'); // Adjust path if your Express app is elsewhere

describe('Health Check API', () => {
  it('should return 200 OK and status up', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'up' });
  });
});