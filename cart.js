let items = [];

module.exports = {
  addItem(name, _id, price) {
    const existing = items.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ name, quantity: 1, price });
    }
  },
  removeItem(name) {
    items = items.filter(item => item.name !== name);
  },
  getItems() {
    return items;
  },
  getTotalPrice() {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  updateQuantity(name, quantity) {
    const item = items.find(item => item.name === name);
    if (item) item.quantity = quantity;
  },
  // Optional: reset cart for testing
  _reset() {
    items = [];
  }
};