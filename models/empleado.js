const { Schema, model } = require('mongoose');

const EmpleadoSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña  es obligatoria'],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    emun: ['EMPLEADO_ROLE'],
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

EmpleadoSchema.methods.toJSON = function () {
  const { __v, password, _id, ...empleado } = this.toObject();
  empleado.uid = _id;
  return empleado;
};

module.exports = model('Empleado', EmpleadoSchema);
