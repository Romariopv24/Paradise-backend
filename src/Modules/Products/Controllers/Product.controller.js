import supabase from '../../../DB/connection.js'
import Product from '../Models/Product.model.js'


//obtener todos los productos
 export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        if(!products || products.length === 0) {
            return res.status(404).json({message: 'No hay productos encontrados'})
        } 

        return res.json(products)
    } catch (error) {
        console.error('Error al obtener el producto:', error)
        return res.status(500).json({message:'Internal Server Error'})
    }
 }

 //Agregar productos

 export const addProducts = async (req, res) => {
  try {
    const { image, name, category, price, description } = req.body;
    
    if (!image || !name || !category || !price || !description) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    const nosql = [{data: {image, name, category, price, description}}]

    const { error } = await supabase.from("products").insert(nosql)

    if (error) console.log(error.message);

    return res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      product: nosql[0]
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

 export const deleProduct = async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.productId)
        if(!deleProduct) {
            return res.status(404).json({message: 'El producto no existe'})
        }
        return res.status(201).json({message: 'El producto ha sido eliminado correctamente'})
    } catch (error) {
        console.error('Error al eiminar el producto: ', error)

        return res.status(500).json({message: 'Error interno del servidor'})

    }
 }

 export const updateProduct = async (req, res) => { 
    try {
        const { productId } = req.params
        const { image, name, price, description, category } = req.body

        const product = await Product.findByIdAndUpdate(productId, {image, name, price, description, category }, { new: true })
        if(!product) {
            return res.status(404).json({message: 'El producto no existe'})
        }

        return res.status(200).json({message: 'El producto ha sido actualizado correctamente', product})
    } catch (error) {
        console.error('Error al actualizar el producto: ', error)

        return res.status(500).json({message: 'Error interno del servidor'})
    }
 }
