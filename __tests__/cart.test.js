const cart = require('../cart'); // Adjust the path as necessary

// Mock product data from your application
const mockProducts = [
    { _id : '67a1f4e43f34a77b6dde9144' , name : 'Apple AirPods Pro 2nd gen', price: 499.99 },
    { _id : '67a1f52e3f34a77b6dde914a' , name : 'Bose QuietComfort 45', price: 429.99 },
    { _id : '67a1f5663f34a77b6dde914c' , name : 'Samsung Galaxy S23', price: 899.99 },
];

// Reset cart before each test
beforeEach(() => {
  cart._reset();
});

describe('Cart', () => {
  beforeEach(() => cart._reset());

  test('adding the same item twice increments quantity', () => {
    cart.addItem('apple', '1', 1.0);
    cart.addItem('apple', '1', 1.0);
    const items = cart.getItems();
    expect(items).toHaveLength(1);
    expect(items[0].name).toBe('apple');
    expect(items[0].quantity).toBe(2);
  });

  test('add item to cart', () => {
      const product = mockProducts[0]; // Product A
      cart.addItem(product.name, '67a1f4e43f34a77b6dde9144', product.price);
      expect(cart.getItems()).toEqual([{ name: product.name, quantity: 1, price: product.price }]);
  });

  test('remove item from cart', () => {
      const product = mockProducts[1]; // Product B
      cart.addItem(product.name, '67a1f52e3f34a77b6dde914a', product.price);
      cart.removeItem(product.name);
      expect(cart.getItems()).toEqual([]);
  });

  test('update total price based on quantity', () => {
      const product = mockProducts[2]; // Product C
      cart.addItem(product.name, '67a1f5663f34a77b6dde914c', product.price);
      expect(cart.getTotalPrice()).toBe(product.price); // 899.99
      cart.updateQuantity(product.name, 5);
      expect(cart.getTotalPrice()).toBe(product.price * 5); // 4499.95
  });

  test('add item to cart increases cart size', () => {
      cart.addItem('Apple AirPods Pro 2nd gen', 1, 10); // Add a product
      expect(cart.getItems().length).toBe(1); // Cart size should be 1
      cart.addItem('Bose QuietComfort 45', 1, 20); // Add another product
      expect(cart.getItems().length).toBe(2); // Cart size should be 2
  });

  test('remove item from cart decreases cart size', () => {
      cart.addItem('Apple AirPods Pro 2nd gen', 1, 10); // Add a product
      cart.addItem('Bose QuietComfort 45', 1, 20); // Add another product
      cart.removeItem('Apple AirPods Pro 2nd gen'); // Remove one product
      expect(cart.getItems().length).toBe(1); // Cart size should be 1
      cart.removeItem('Bose QuietComfort 45'); // Remove the other product
      expect(cart.getItems().length).toBe(0); // Cart size should be 0
  });

  test('update quantity does not change cart size but affects total quantity', () => {
      cart.addItem('Apple AirPods Pro 2nd gen', 1, 10); // Add a product
      expect(cart.getItems().length).toBe(1); // Cart size should be 1
      cart.updateQuantity('Apple AirPods Pro 2nd gen', 5); // Update quantity
      expect(cart.getItems()[0].quantity).toBe(5); // Quantity should be updated to 5
  });

  test('update quantity on non-existent item does nothing', () => {
      cart.addItem('Apple AirPods Pro 2nd gen', 1, 10);
      // Try to update an item not in cart
      cart.updateQuantity('Nonexistent Item', 10);
      // Cart should be unchanged
      expect(cart.getItems()).toHaveLength(1);
      expect(cart.getItems()[0].name).toBe('Apple AirPods Pro 2nd gen');
      expect(cart.getItems()[0].quantity).toBe(1);
  });
});