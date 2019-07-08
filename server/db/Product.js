const Sequelize = require('sequelize');
const db = require('./db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validation: {
      notEmpty: true,
    },
  },
  description: Sequelize.TEXT,
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validation: {
      notEmpty: true,
      min: 0.0,
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validation: {
      notEmpty: true,
      min: 0,
    },
  },
  
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'src="https://picsum.photos/id/12/640/480',
  },
  rating: {
    type: Sequelize.DECIMAL(10, 1),
    defaultValue: 3.0,
  },
  available: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  }
});

module.exports = Product;
