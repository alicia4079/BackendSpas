const Costumer = require("../models/costumer")

const getCostumers = async (req, res, next) => {
  try {
    const costumers = await Costumer.find().populate('spa');
    return res.status(200).json(costumers)
  } catch (error) {
    return res.status(400).json('Error al buscar clientes')
  }
}

const getCostumersById = async (req, res, next) => {
  try {
    const { id } = req.params
    const costumer = await Costumer.findById(id).populate('spa');
    return res.status(200).json(costumer)
  } catch (error) {
    return res.status(400).json('Error al buscar por categorías')
  }
}
const getCostumerByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ message: 'El email es requerido' });
    }
    const costumer = await Costumer.findOne({ email }).populate('spa');
    if (!costumer) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    return res.status(200).json(costumer);
  } catch (error) {
    return res.status(400).json({ message: 'Error al buscar cliente por email' });
  }
};

const postCostumer = async (req, res, next) => {
  try {
    const { name } = req.body
    const existingCostumer = await Costumer.findOne({ name })

    if (existingCostumer) {
      return res
        .status(400)
        .json({ error: 'Ya existe un cliente con este nombre' })
    }

    const newCostumer = new Costumer(req.body)
    const costumerSaved = await newCostumer.save()

    return res.status(201).json(costumerSaved)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const deleteCostumer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const costumerDeleted = await Costumer.findByIdAndDelete(id);
    return res.json(costumerDeleted)
  } catch (error) {
    return res.status(400).json("Error al borrar un cliente");
  }
};

const updateCostumer = async (req, res, next) => {
  try {
    const { id } = req.params
    const newCostumer = new Costumer(req.body)
    newCostumer._id = id
    const up = await Costumer.findByIdAndUpdate(id, newCostumer, { new: true })
    return res.status(200).json(up)
  } catch (error) {
    return res.status(400).json('Error')
  }
} 

module.exports = {getCostumers, getCostumersById,getCostumerByEmail, postCostumer, deleteCostumer, updateCostumer}