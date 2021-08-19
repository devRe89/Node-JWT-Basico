const { Router } = require('express');
const userController = require('../controllers/userController');
const {validarJWT} = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',
    userController.createUser
);

router.delete('/:id', 
    validarJWT,
    userController.deleteUser
);

module.exports = router;