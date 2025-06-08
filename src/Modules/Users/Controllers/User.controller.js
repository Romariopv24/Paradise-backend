import User from '../Models/Users.model.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
    const { firstName, lastName, phone, email, password, roles } = req.body;

    const emptyBodyReq = Object.values(req.body).some(element => element === null);

    if (emptyBodyReq) {
        return res.status(400).json({ message: "No ha seleccionado ningun campo" });
    }

    try {
        const userData = new User({
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            password: bcrypt.hashSync(password, 10),
            roles: roles,
        });

       const userSaved = await userData.save();

        res.status(201).json({ message: "Usuario registrado con éxito", user: 
            { 
                id: userSaved._id, 
                fullName: `${userSaved.firstName} ${userSaved.lastName}`, 
                email: userSaved.email,
                createdAt: userSaved.createdAt,
                updatedAt: userSaved.updatedAt
               }
         });
    } catch (error) {
        
        if(error.message === "E11000 duplicate key error collection: ParadiseDB.users index: email_1 dup key: { email: \"gmailsssgmail.com\" }") {
            return res.status(500).send({message: "Correo duplicado, por favor ingrese un correo diferente"})
        }
        res.status(500).send({ message: error.message });
    }
}


export const loginUser = async(req, res) => {
    
}