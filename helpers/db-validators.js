const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Empleado = require('../models/empleado');

const esRoleValido = async (rol = '') => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) throw new Error(`El rol ${rol} no esta registrado en la BD`);
};

const emailExiste = async (correo = '') => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) throw new Error(`El correo ${correo} ya esta registrado en la BD`);
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) throw new Error(`El id: ${id} no existe en la BD`);
};

const emailEmpleadoExiste = async (correo = '') => {
  const existeEmail = await Empleado.findOne({ correo });
  if (existeEmail) throw new Error(`El correo ${correo} ya esta registrado en la BD`);
};

const existeEmpleadoPorId = async (id) => {
  const existeUsuario = await Empleado.findById(id);
  if (!existeUsuario) throw new Error(`El id: ${id} no existe en la BD`);
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  emailEmpleadoExiste,
  existeEmpleadoPorId,
};
