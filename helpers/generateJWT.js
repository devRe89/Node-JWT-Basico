const e = require('express');
const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '' ) => {

    return new Promise((res, rej) => {

        const payload = { uid };
        jwt.sign( payload, process.env.SECRETO, {
            expiresIn: '1h'
        }, (err, token) => {
            if ( err ){
                console.log(err);
                rej('No se pudo generar el JWT');
            } else{
                res( token );
            }
        });
    });

}

const validarJWT = ( req, res, next ) => {
    //Obtener token del header
    const token = req.header('x-auth-token');

    if ( !token ){
        res.status(401).json({
            msg: "No hay token para realizar la petición"
        });
    }

    try {
        const {uid} = jwt.verify( token, process.env.SECRETO );
        req.uid_autenticado = uid;
        /* 
            Con el uid_autenticado:
                - Se puede Agregar, Modificar, Leer y Eliminar en el sistema.
                - Ya que este se disponibiliza en los demas middlewares y controladores.
        */
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no es válido",
        });
    }
}

module.exports = {
    generarJWT,
    validarJWT
}