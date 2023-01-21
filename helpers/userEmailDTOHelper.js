module.exports.UserEmailDTO = (model) => {
    this.email = model.email;
    this.id = model.userId;
    this.isActivated = model.activate;
    return this;
}