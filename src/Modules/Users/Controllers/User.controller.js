import supabase from '../../../DB/connection.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export const registerUserSql = async(req, res) => {
    const {firstName, lastName, phone, email, password} = req.body;

    const requiredKeys = ['firstName', 'lastName', 'phone', 'email', 'password'];
    
      for (const key of requiredKeys) {
        if (!req.body.hasOwnProperty(key) || req.body[key] === undefined || req.body[key] === null || req.body[key] === "") {
            return res.status(400).json({ message: `El campo '${key}' es requerido` });
        }
    }

    try {
        const {data: existing, error: findError} = await supabase.from("user-mysql").select("*").eq("email", email).single();
        if (findError) {
            return res.status(500).json({ message: findError.message || 'Error al verificar usuario existente' });
        }
        if (existing) {
            return res.status(409).json({ message: 'El correo ya está registrado. Por favor, use otro correo.' });
        }

        const { data, error } = await supabase.from("user-mysql").insert([{ firstName, lastName, phone, email, password: bcrypt.hashSync(password, 10), role: 1002 }]).select();
        if (error) {
            return res.status(500).json({ message: error.message || 'Error al registrar usuario en MySQL' });
        }
        console.log("Usuario registrado en MySQL:", data);
        res.status(200).json({ message: "Usuario registrado con éxito en MySQL", user: { firstName, lastName, phone, email, password: bcrypt.hashSync(password, 10), role: 1002 } });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al registrar usuario en MySQL' });
    }
}



export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña requeridos' });
    }

    // Busca el usuario en Supabase
    const { data: users, error: findError } = await supabase.from("users").select("data").eq('data->>email', email);
    if (findError) {
        return res.status(500).json({ message: findError.message || 'Error al buscar usuario' });
    }
    const user = users && users.length > 0 ? users[0].data : null;
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verifica la contraseña
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Genera el token
    const token = jwt.sign(
        { email: user.email, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1h' }
    );
    res.status(200).json({ message: 'Login exitoso', token });
};



export const logoutUser = async (req, res) => {
    // Para mayor seguridad, puedes requerir el token JWT en el header Authorization
    // Ejemplo: Authorization: Bearer <token>
    // Luego, aquí puedes validar el token (opcionalmente agregarlo a una blacklist si implementas una)
    // Pero normalmente, solo el cliente elimina el token y el backend responde OK

    // Si quieres validar el token:
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }
    const token = authHeader.split(' ')[1];
    try {
        jwt.verify(token, process.env.JWT_SECRET || 'secret');
        // Aquí podrías agregar el token a una blacklist si implementas esa lógica
        res.status(200).json({ message: 'Logout exitoso' });
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};