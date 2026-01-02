import supabase from '../../../DB/connection.js'

// Obtener un solo producto por id
export const getProductById = async (req, res) => {
    try {
        const { productId } = req.query;
        if (!productId) {
            return res.status(400).json({ message: 'Falta el parámetro productId' });
        }
        const { data, error } = await supabase.from("products").select("*").eq('id', productId);
        if (error) {
            console.error('Error al obtener el producto de Supabase:', error);
            return res.status(500).json({ message: 'Error al obtener el producto de Supabase' });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'El producto no existe' });
        }
        return res.json(data[0]);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


//obtener todos los productos
export const getProducts = async (req, res) => {
    try {
        const { data: products, error } = await supabase.from("products_mysql").select("*");
        if (error) {
            console.error('Error al obtener productos de Supabase:', error);
            return res.status(500).json({ message: 'Error al obtener productos de Supabase' });
        }
        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No hay productos encontrados' });
        }
        return res.json(products);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

 //Agregar productos

 export const addProducts = async (req, res) => {
  try {
    const { image, name, price, description, quantity} = req.body;

    // Validación estricta de campos requeridos
    const requiredKeys = ['image', 'name', 'price', 'description', 'quantity'];
    for (const key of requiredKeys) {
      if (!req.body.hasOwnProperty(key) || req.body[key] === undefined || req.body[key] === null || req.body[key] === "") {
        return res.status(400).json({
          success: false,
          message: `El campo '${key}' es requerido`
        });
      }
    }

    const insertData = { image, name, price, description, quantity };

    const { error } = await supabase.from("products_mysql").insert([insertData]).select();

    if (error) {
      console.log(error.message);
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

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
        const { productId } = req.params;
        const { error } = await supabase.from("products").delete().eq('id', productId);
        if (error) {
            console.error('Error al eliminar el producto en Supabase:', error);
            return res.status(500).json({ message: 'Error al eliminar el producto en Supabase' });
        }
        return res.status(200).json({ message: 'El producto ha sido eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el producto: ', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { image, name, price, description, category } = req.body;
        const { data, error } = await supabase
            .from("products")
            .update({ image, name, price, description, category })
            .eq('id', productId)
            .select();
        if (error) {
            console.error('Error al actualizar el producto en Supabase:', error);
            return res.status(500).json({ message: 'Error al actualizar el producto en Supabase' });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'El producto no existe' });
        }
        return res.status(200).json({ message: 'El producto ha sido actualizado correctamente', product: data[0] });
    } catch (error) {
        console.error('Error al actualizar el producto: ', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}
