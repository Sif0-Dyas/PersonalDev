const UserController = require("../controllers/user.controller")
const {authenticate} = require('../config/jwt.config')

module.exports = app =>{
    app.post(`/api/register`, UserController.register)
    app.post(`/api/login`, UserController.login)
    app.get(`/api/logout`, UserController.logout)
    app.get(`/api/cookie`, UserController.cookie)
    app.get(`/api/getUser`, UserController.getUser)
    app.get(`/api/allUsers`, authenticate, UserController.index)
}