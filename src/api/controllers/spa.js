const Spa = require("../models/spa")

const getSpas = async (req, res, next) => {
  try {
    const spas = await Spa.find()
    return res.status(200).json(spas)
  } catch (error) {
    return res.status(400).json('Error al hacer el buscar spas')
  }
}

const getSpasById = async (req, res, next) => {
  try {
    const { id } = req.params
    const spa = await Spa.findById(id)
    return res.status(200).json(spa)
  } catch (error) {
    return res.status(400).json('Error al buscar spa por id')
  }
}
const postSpa = async (req, res, next) => {
  try {
    const newSpa = new Spa(req.body);
    const spaSaved = await newSpa.save();
    return res.status(201).json(spaSaved);
  } catch (error) {
    return res.status(400).json("Error al publicar un Spa");
  }
};

const deleteSpa = async (req, res, next) => {
  try {
    const { id } = req.params;
    const spaDeleted = await Spa.findByIdAndDelete(id);
    return res.json(spaDeleted)
  } catch (error) {
    return res.status(400).json("Error al borrar spa");
  }
};

const updateSpa = async (req, res, next) => {
  try {
    const { id } = req.params
    const newSpa = new Spa(req.body)
    newSpa._id = id
    const up = await Spa.findByIdAndUpdate(id, newSpa, { new: true })
    return res.status(200).json(up)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

module.exports = {getSpas, getSpasById, postSpa, deleteSpa, updateSpa}