const {generarJWT} = require('../helpers/generateJWT');

exports.createUser = async (req, res) => {

    const {nombre} = req.body;
    // uid de prueba
    const uid = Math.random().toFixed(2)*100;

    const token = await generarJWT( uid );

    res.json({
        resToken : token,
        uid
    });
}

exports.deleteUser = (req, res) => {
    console.log(req.uid_autenticado);
    try {
        res.json({
            uid: req.params.id,
            msg: "Se permite eliminar Usuario",
        });
    } catch (error) {
        console.log(error);
    }
}