const { User, Email, Phone } = require('../models/models');

const { ApiError } = require('../errors/ApiError');

class UserService {

  async getAllUsers(req, res) {

  }

  async getOneUserById(id) {
    const user = await User.findOne({ where: { id } })
    return user;
  }

  async getOneUserByEmail(email) {
    const user = await User.findOne({ where: { email } })
    return user === null ? {} : user.dataValues
  }

  async getOneUserByPhone(phone) {
    const user = await User.findOne({ where: { phone } })
    return user === null ? {} : user.dataValues
  }

  async updateUser(req, res) {

  }

  async destroyUser(req, res) {

  }
}

module.exports = new UserService()