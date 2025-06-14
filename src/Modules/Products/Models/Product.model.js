import {Schema, model} from 'mongoose'

const productSchema = new Schema({
    image: {type:String, required: true},
    name: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type:String, required: true}, 
    createAt: {type: Date, default: Date.now}   
})

export default model('Product', productSchema)