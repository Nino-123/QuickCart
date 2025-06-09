const { Pool } = require('pg');
const app = require('../src/app');
const request = require('supertest');

describe('Database Integration Tests', () => {
  let pool;

  beforeAll(async () => {
    pool = new Pool({
      host: process.env.TEST_DB_HOST || 'localhost',
      port: process.env.TEST_DB_PORT || 5432,
      database: process.env.TEST_DB_NAME || 'test_db',
      user: process.env.TEST_DB_USER || 'test_user',
      password: process.env.TEST_DB_PASSWORD || 'test_password',
    });
    // Create users table for testing
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL
      )
    `);
  });

  afterAll(async () => {
    // Drop users table and close DB connection
    await pool.query('DROP TABLE IF EXISTS users');
    await pool.end();
  });

  beforeEach(async () => {
    // Clear table before each test
    await pool.query('DELETE FROM users');
  });

  test('should create and retrieve user', async () => {
    const userData = { email: 'test@example.com' };
    // Create user via API
    const createResponse = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);
    expect(createResponse.body).toHaveProperty('id');
    // Verify user exists in database
    const dbResult = await pool.query('SELECT * FROM users WHERE id = $1', [
      createResponse.body.id,
    ]);
    expect(dbResult.rows).toHaveLength(1);
    expect(dbResult.rows[0].email).toBe(userData.email);
  });
});