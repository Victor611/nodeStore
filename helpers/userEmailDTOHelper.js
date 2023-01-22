module.exports.UserEmailDTO = (model) => {
    const normalised = {
        email: model.email,
        id: model.userId,
        isActivated: model.activate
    }
    return normalised;
}