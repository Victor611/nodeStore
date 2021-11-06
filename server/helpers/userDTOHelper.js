module.exports.UserEmailDTO = (model) => {
        this.email = model.email;
        this.id = model.userId;
        this.isActivated = model.isActivated;
        return this;
}
