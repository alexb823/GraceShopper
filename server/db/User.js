const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "First name can't be empty" },
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Last name can't be empty" },
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://images.dailykos.com/images/479822/story_image/unnamed.jpg?1512326578',
    validate: {
      isUrl: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: { msg: 'Email must be unique' },
    validate: {
      notEmpty: { msg: "Email can't be empty" },
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: {args: [5, 12], msg: "Password must be 5-12 characters long"},
    },
  },
  admin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
    fullName: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
    },
  },
}, {
  hooks: {
    beforeValidate: user => {
      if (!user.imageUrl)
        user.imageUrl =
          'https://images.dailykos.com/images/479822/story_image/unnamed.jpg?1512326578';
    },
  },
});

module.exports = User;
