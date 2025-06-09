// Minimal in-memory UserService for testing

let users = [];
let nextId = 1;

exports.createUser = async ({ name, email }) => {
  if (!email) throw new Error('Email required');
  if (users.find(u => u.email === email)) throw new Error('duplicate email');
  const user = { id: nextId++, name, email };
  users.push(user);
  return user;
};

exports._reset = () => {
  users = [];
  nextId = 1;
};