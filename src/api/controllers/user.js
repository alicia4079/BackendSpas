const { generateSign } = require('../../config/jwt')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      email: req.body.email,
      userName: req.body.userName,
      password: req.body.password,
      rol: "user",
    })

    const userDuplicated = await User.findOne({ email: req.body.email })

    if (userDuplicated) {
      return res.status(400).json('Ya existe ese usuario.')
    }

    const userSaved = await newUser.save()

    return res.status(201).json(userSaved)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName })

    if (!user) {
      return res.status(400).json('El usuario o la contraseña son incorrectos')
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id)
      return res.status(200).json({ user, token })
    } else {
      return res.status(400).json('El usuario o la contraseña son incorrectos')
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const userDeleted = await User.findByIdAndDelete(id)
    return res.status(200).json({
      mensaje: 'Este usuario ha sido eliminado',
      userDeleted
    })
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json(error)
  }
}


const changePassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Se requieren la contraseña actual y la nueva' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = bcrypt.compareSync(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'La contraseña actual es incorrecta' });
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(newPassword, saltRounds);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Error al actualizar la contraseña' });
    }

    return res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al cambiar la contraseña', error });
  }
};




module.exports = { register, login, deleteUser, getUsers, changePassword };


