import { Schema, model } from 'mongoose'

const role = new Schema({
    name: String
})

export default model("Role", role)