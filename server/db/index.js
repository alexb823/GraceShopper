const db = require('./db');
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Cart = require('./Cart');
const LineItem = require('./LineItem');
const Address = require('./Address');
const syncAndSeed = require('./seed');

// Association
Product.belongsTo(Category);
Address.belongsTo(User);
Cart.belongsTo(User);
Cart.belongsTo(Address);
LineItem.belongsTo(Cart);
LineItem.belongsTo(Product);
Cart.hasMany(LineItem);

module.exports = {
  syncAndSeed,
  models: {
    User,
    Address,
    Category,
    Product,
    Cart,
    LineItem,
  },
};
