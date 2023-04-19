const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require("../conexion");



const login = async (req, res) => {
  const { correo, password } = req.body;

  // Verifica que el correo y la contraseña estén presentes.
  if (!correo || !password) {
    return res.status(400).json({ message: 'El correo y la contraseña son requeridos.' });
  }

  try {
    // Busca al usuario en la base de datos.
    const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);

    // Si el usuario no existe, devuelve un mensaje de error.
    if (result.rowCount === 0) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
    }

    // Si el usuario existe, verifica la contraseña cifrada.
    const usuario = result.rows[0];
    const match = await bcrypt.compare(password, usuario.password);

    // Si la contraseña no coincide, devuelve un mensaje de error.
    if (!match) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
    }

    // Si la contraseña coincide, genera un token de autenticación.
    const token = jwt.sign({ id: usuario.id }, 'mysecretkey');

    // Devuelve el token de autenticación.
    res.json({
      ok:true,
      msg:'funciona',
      nombre:usuario.nombre_1,
      token,correo });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

module.exports = 
{
  login
}
  
