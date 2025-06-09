// UserService tests with async/await and promises

const UserService = require('../src/services/userservice'); // Adjust path as needed

describe('UserService', () => {
  beforeEach(() => {
    // Reset the user service state before each test
    if (UserService._reset) UserService._reset();
  });

  it('should create a user with async/await', async () => {
    const userData = { name: 'Alice', email: 'alice@example.com' };
    const user = await UserService.createUser(userData);
    expect(user).toHaveProperty('id');
    expect(user.name).toBe(userData.name);
  });

  it('should not allow duplicate emails (Promise style)', () => {
    const userData = { name: 'Bob', email: 'bob@example.com' };
    return UserService.createUser(userData)
      .then(() => UserService.createUser(userData))
      .catch(err => {
        expect(err).toBeDefined();
        expect(err.message).toMatch(/duplicate/i);
      });
  });

  it('should reject creating user without email', async () => {
    await expect(UserService.createUser({ name: 'NoEmail' })).rejects.toThrow();
  });
});