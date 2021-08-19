const { Router } = require('express');
const userController = require('../controllers/userController');
const {validarJWT} = require('../helpers/generateJWT');

const router = Router();

router.get('/',
    userController.createUser
);

router.delete('/:id', 
    validarJWT,
    userController.deleteUser
);

module.exports = router;