const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Empleado = require('../models/empleado');

const empleadosGet = async (req, res = response) => {
  const [empleados, total] = await Promise.all([
    Empleado.find({ estado: true }),
    Empleado.count({ estado: true }),
  ]);

  res.json({
    empleados,
    total,
  });
};

const empleadoGet = async (req = request, res = response) => {
  const { id } = req.params;
  const empleado = await Empleado.findById({ _id: id, estado: true });

  res.json(empleado);
};

const empleadosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const empleado = new Empleado({ nombre, correo, password, rol });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  empleado.password = bcryptjs.hashSync(password, salt);

  //Guardar registro
  await empleado.save();

  res.json(empleado);
};

const empleadosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, correo, ...resto } = req.body;

  if (password) {
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const empleado = await Empleado.findByIdAndUpdate(id, resto);

  res.json(empleado);
};

const empleadosDelete = async (req, res = response) => {
  const { id } = req.params;
  const empleado = await empleado.findByIdAndUpdate(id, { estado: false });

  res.json(empleado);
};

module.exports = {
  empleadosGet,
  empleadoGet,
  empleadosPost,
  empleadosPut,
  empleadosDelete,
};
