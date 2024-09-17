const { isAuth, isAdmin } = require('../../middlewares/auth')
const { getUsers, register, login, deleteUser, changePassword } = require('../controllers/user')

const usersRoutes = require('express').Router()

usersRoutes.get('/',isAuth, isAdmin, getUsers)
usersRoutes.post('/register', register)
usersRoutes.post('/login', login)
usersRoutes.delete('/:id', isAuth, isAdmin, deleteUser)
usersRoutes.delete('/:id', isAuth, changePassword)

module.exports = usersRoutes
