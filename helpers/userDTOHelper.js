module.exports.UserEmailDTO = (model) => {
    this.email = model.email;
    this.id = model.userId;
    this.isActivated = model.isActivated;
    return this;
}

module.exports.UserDTO = (model) => {
    this.id = model.id,
    this.first_name = model.first_name,
    this.last_name = model.last_name,
    this.birthday = model.birthday,
    this.gender = model.gender,
    this.isActivated = model.activate;
    return this;
}
