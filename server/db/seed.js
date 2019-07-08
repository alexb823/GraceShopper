const faker = require('faker');
const db = require('./db');
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Cart = require('./Cart');
const LineItem = require('./LineItem');
const Address = require('./Address');

// Class methods for creating fake model instances
// Creating fake users
User.createFakeUser = function() {
  return this.create({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    imageUrl: faker.internet.avatar(),
    email: faker.internet.email(),
    password: '12345',
  });
};

User.createAdmin = function() {
  return this.create({
    firstName: 'Curly',
    lastName: 'Howard',
    imageUrl:
      'https://images.dailykos.com/images/479822/story_image/unnamed.jpg?1512326578',
    email: 'email@gmail.com',
    password: '12345',
    admin: true,
  });
};

User.createFakeUsers = function(count) {
  const users = [];
  while (users.length < count) {
    users.push(this.createFakeUser());
  }
  return users;
};

// Creating fake address
Address.createFakeAddress = function(userId) {
  return this.create({
    streetAddress: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zipCode: faker.address.zipCode(),
    userId,
  });
};

// Creating unique categories
Category.createFakeCategories = function(count) {
  const names = [];
  while (names.length < count) {
    const name = faker.commerce.department();
    if (!names.includes(name)) names.push(name);
  }
  return names.map(name => this.create({ name }));
};

// Creating fake product
Product.createFakeProduct = function(categoryId) {
  return this.create({
    name: faker.commerce.productName(),
    description: faker.lorem.paragraphs(5),
    price: faker.finance.amount(50, 150, 2),
    quantity: 10,
    imageUrl: `https://picsum.photos/id/${Math.round(
      Math.random() * 100
    )}/640/480`,
    rating: Math.round(Math.random() * 50) / 10,
    categoryId,
  });
};

Product.createFakeProducts = function(count, categoryId) {
  const products = [];
  while (products.length < count) {
    products.push(this.createFakeProduct(categoryId));
  }
  return products;
};

const syncAndSeed = () => {
  return db
    .sync({ force: true })
    .then(() => Promise.all(User.createFakeUsers(3)))
    .then(users =>
      Promise.all(
        users.map(user =>
          Promise.all([
            Address.createFakeAddress(user.id),
            Cart.create({ userId: user.id }),
          ])
        )
      )
    )
    .then(() => User.createAdmin())
    .then(user =>
      Promise.all([
        Address.createFakeAddress(user.id),
        Cart.create({ userId: user.id }),
      ])
    )
    .then(() => Promise.all(Category.createFakeCategories(5)))
    .then(categories =>
      Promise.all(
        categories.map(category => Product.createFakeProducts(5, category.id))
      )
    )
    .then(() => console.log('Database is synced and seeded'))
    .catch(err => console.error(err));
};

module.exports = syncAndSeed;
