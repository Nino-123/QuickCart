const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = require('../src/app'); // Make sure this exports your Express/Next.js app
const User = require('../models/User'); // Adjust path to your User model

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
});

test('should create and retrieve user', async () => {
  const userData = {
    _id: 'testid123',
    name: 'Test User',
    email: 'test@example.com',
    imageUrl: 'https://example.com/image.png',
    cartItems: {}
  };
  // Create user via API
  const createResponse = await request(app)
    .post('/api/users')
    .send(userData)
    .expect(201);
  expect(createResponse.body).toHaveProperty('_id');
  // Verify user exists in database
  const dbUser = await User.findById(createResponse.body._id);
  expect(dbUser).not.toBeNull();
  expect(dbUser.email).toBe(userData.email);
});

test('should return 400 if required fields are missing', async () => {
  const incompleteUser = { email: 'incomplete@example.com' }; // missing _id, name, imageUrl
  const response = await request(app)
    .post('/api/users')
    .send(incompleteUser)
    .expect(400);
  expect(response.body).toHaveProperty('error');
});
