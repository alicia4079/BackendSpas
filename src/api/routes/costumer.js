const { isAuth, isAdmin } = require('../../middlewares/auth')
const { getCostumers, getCostumersById, postCostumer, deleteCostumer, updateCostumer } = require('../controllers/costumer')


const costumerRoutes = require('express').Router()

costumerRoutes.get('/', getCostumers)
costumerRoutes.get('/:id', getCostumersById)
costumerRoutes.post('/', isAuth, isAdmin, postCostumer)
costumerRoutes.delete('/:id',isAuth, isAdmin, deleteCostumer)
costumerRoutes.put('/:id',isAuth, isAdmin, updateCostumer)

 
module.exports = costumerRoutes