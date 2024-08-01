const { isAuth, isAdmin } = require('../../middlewares/auth')
const { getSpas, getSpasById, postSpa, deleteSpa, updateSpa } = require('../controllers/spa')


const spasRoutes = require('express').Router()

spasRoutes.get('/', getSpas)
spasRoutes.get('/:id', getSpasById)
spasRoutes.post('/',isAuth, isAdmin, postSpa)
spasRoutes.delete('/:id',isAuth, isAdmin, deleteSpa)
spasRoutes.put('/:id', isAuth, isAdmin, updateSpa)

module.exports = spasRoutes