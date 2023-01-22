module.exports.UserDTO = (model) => {
    const normalised = {
        id: model.id,
        first_name: model.first_name,
        last_name: model.last_name,
        birthday: model.birthday,
        gender: model.gender,
        isActivated: model.activate
    }
    
    return normalised;
}
