const sequelize = require('../config/db')
const {DataTypes} = require('sequelize')

const Basket = sequelize.define('basket', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketDevice = sequelize.define('basket_devices', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Brand = sequelize.define('brand', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique:true, allowNull: false},
})

const Device = sequelize.define('device', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  price: { type: DataTypes.INTEGER, allowNull: false},
  rating: {type: DataTypes.INTEGER, defaultValue: 0},
  img: {type: DataTypes.STRING, allowNull: false},
})

const DeviceInfo = sequelize.define('device_info', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING,  allowNull: false},
  description: {type: DataTypes.STRING, allowNull:false},
})

const Rating = sequelize.define('rating', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  rate: {type: DataTypes.INTEGER, allowNull: false},
})

const Type = sequelize.define('type', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull:false},
})

const TypeBrand = sequelize.define('type_brand', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  first_name: {type: DataTypes.STRING},
  last_name: {type: DataTypes.STRING},
  birthday: {type: DataTypes.DATE},
  gender: {type: DataTypes.SMALLINT},
  role: {type: DataTypes.STRING, defaultValue: "user"},
  activate: {type: DataTypes.BOOLEAN, defaultValue: false}
})

const Email = sequelize.define('email', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true, allowNull:false},
  hashPassword: { type: DataTypes.STRING},
  activationLink: {type: DataTypes.STRING},
  activate: {type: DataTypes.BOOLEAN, defaultValue: false },
  disabled: {type: DataTypes.BOOLEAN, defaultValue: false}
})

const Phone = sequelize.define('phone', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  phone: {type: DataTypes.STRING, unique: true},
  hashPassword: { type: DataTypes.STRING},
  activationLink: {type: DataTypes.STRING},
  activate: {type: DataTypes.BOOLEAN, defaultValue: false},
  disabled: {type: DataTypes.BOOLEAN, defaultValue: false}
})

const Token = sequelize.define('token', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  refresh_token: {type: DataTypes.STRING, allowNull:false}
})

User.hasOne(Basket)
User.hasMany(Rating)
User.hasMany(Email)
User.hasMany(Phone)
User.hasOne(Token)

Type.hasMany(Device)
Type.belongsToMany(Brand, {through: TypeBrand})

Rating.belongsTo(User)
Rating.belongsTo(Device)

DeviceInfo.belongsTo(Device)

Device.belongsTo(Type)
Device.hasMany(DeviceInfo, {as: 'info'});
Device.belongsTo(Brand)
Device.hasMany(Rating)
Device.hasMany(BasketDevice)

Brand.hasMany(Device)
Brand.belongsToMany(Type, {through: TypeBrand})

Basket.belongsTo(User)
Basket.hasMany(BasketDevice)

BasketDevice.belongsTo(Basket)
BasketDevice.belongsTo(Device)

Email.belongsTo(User)

Phone.belongsTo(User)

Token.belongsTo(User)

module.exports = {Basket, BasketDevice, Brand, Device, DeviceInfo, Rating, Type, TypeBrand, User, Email, Phone, Token}