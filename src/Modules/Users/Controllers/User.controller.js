import supabase from '../../../DB/connection.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
    const { firstName, lastName, phone, email, password } = req.body;

    // Validación estricta de campos requeridos
    const requiredKeys = ['firstName', 'lastName', 'phone', 'email', 'password'];
    for (const key of requiredKeys) {
        if (!req.body.hasOwnProperty(key) || req.body[key] === undefined || req.body[key] === null || req.body[key] === "") {
            return res.status(400).json({ message: `El campo '${key}' es requerido` });
        }
    }

    try {
        // Verifica si el usuario ya existe en Supabase
        const { data: existing, error: findError } = await supabase.from("users").select("*").eq('email', email);
        if (findError) {
            return res.status(500).json({ message: findError.message || 'Error al verificar usuario existente' });
        }
        if (existing && existing.length > 0) {
            return res.status(400).json({ message: 'Correo duplicado, por favor ingrese un correo diferente' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const userData = {
            firstName,
            lastName,
            phone,
            email,
            password: hashedPassword,
            role: 1002
        };
        // Insertar en tabla relacional (SQL)
        const { data, error } = await supabase.from("users").insert([userData]).select();
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        const user = data && data[0] ? data[0] : userData;

        // Insertar en tabla NoSQL (ejemplo: users_nosql con columna 'data' tipo jsonb)
        const nosqlData = {
            ...user,
            createdAt: new Date().toISOString()
        };
        // Elimina el password antes de guardar en NoSQL por seguridad
        delete nosqlData.password;
        await supabase.from("users_nosql").insert([{ data: nosqlData }]);

        res.status(201).json({ message: "Usuario registrado con éxito", user: {
            ...user
        }});
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


// Login solo para un superusuario, registro si no existe, y logout
const SUPERUSER = {
    email: 'admin@paradise.com',
    password: 'SuperSecret123', // Cambia esto por seguridad
    firstName: 'Super',
    lastName: 'Admin',
    phone: '0000000000',
    role: 1001 // superadmin (number, singular)
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña requeridos' });
    }

    // Solo permite el superusuario
    if (email !== SUPERUSER.email) {
        return res.status(403).json({ message: 'Acceso denegado' });
    }

    // Busca el usuario en Supabase
    const { data: users, error: findError } = await supabase.from("users").select("*").eq('email', email);
    if (findError) {
        return res.status(500).json({ message: findError.message || 'Error al buscar usuario' });
    }
    let user = users && users.length > 0 ? users[0] : null;
    if (!user) {
        // Si no existe, lo registra como superadmin
        const hashedPassword = bcrypt.hashSync(SUPERUSER.password, 10);
        const newUser = { ...SUPERUSER, password: hashedPassword };
        const { data, error } = await supabase.from("users").insert([newUser]).select();
        if (error) {
            return res.status(500).json({ message: 'Error al registrar superusuario' });
        }
        user = data && data[0] ? data[0] : newUser;
    }

    // Verifica la contraseña
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Genera el token
    const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login exitoso', token });
};

export const logoutUser = async (req, res) => {
    // El logout en JWT es del lado del cliente (borrar token)
    // Opcional: puedes implementar una blacklist de tokens si lo deseas
    res.status(200).json({ message: 'Logout exitoso' });
};