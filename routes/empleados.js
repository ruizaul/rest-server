const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');

const {
  esRoleValido,
  emailEmpleadoExiste,
  existeEmpleadoPorId,
} = require('../helpers/db-validators');

const {
  empleadosGet,
  empleadosPut,
  empleadosPost,
  empleadosDelete,
  empleadoGet,
} = require('../controllers/empleados');

const router = Router();

router.get('/', empleadosGet);

router.get('/:id', empleadoGet);

router.put(
  '/:id',
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeEmpleadoPorId),
    check('rol').custom(esRoleValido),
    validarCampos,
  ],
  empleadosPut
);

router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener mas de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailEmpleadoExiste),
    check('rol', 'No es un rol valido').isIn('EMPLEADO_ROLE'),
    check('rol').custom(esRoleValido),
    validarCampos,
  ],
  empleadosPost
);

router.delete(
  '/:id',
  [
    validarJWT,
    //esAdminRole,
    tieneRole('USER_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeEmpleadoPorId),
    validarCampos,
  ],
  empleadosDelete
);

module.exports = router;
