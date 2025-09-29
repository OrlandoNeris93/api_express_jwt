const User = (nombre, email, clave) => {
    let user = { nombre, email, clave};
    return user;
}

module.exports = {User};