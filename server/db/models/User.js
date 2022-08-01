const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');

const SALT_ROUNDS = 5;


const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
  githubId: {
    type: Sequelize.INTEGER
  }
})

module.exports = User


// instance methods
User.prototype.correctPassword = function(pwd) {
  // we need to compare the plain version to an encrypted version of password
  return bcrypt.compare(pwd, this.password)
}

User.prototype.generateToken = function() {
  return jwt.sign({id: this.id, username: this.username}, process.env.JWT)
}

// class methods
User.authenicate = async function({ username, password }) {
  const user = await this.findOne({where: { username }})
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken()
};

User.findByToken = async function(token) {
  try {
    const {id} = await jwt.verify(token, process.env.JWT)
    const user = User.findByPk(id)
    if (!user) {
      throw 'nooo'
    }
    return user
  } catch (err) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
}

// hooks
const hashPassword = async (user) => {
  // in case the pwd has been changed, we want to encrypt it w/ bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS)
  }
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)))