import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, required: true, trim:true},
    email: {type: String, required: true, trim:true, unique: true},
    password: {type:String, required:true},
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Role',
            default: ["user"]
        }
    ]
}, {
    timestamps: true
})

export default model("Users", userSchema)