import supabase from '../../../DB/connection.js'

export const getOrders = async (req, res) => {
    try {
        const { data: orders, error } = await supabase.from("orders").select("*");
        if (error) {
            console.error('Error al obtener las ordenes de Supabase:', error);
            return res.status(500).json({ message: 'Error al obtener las ordenes de Supabase' });
        }
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No hay ordenes' });
        }
        return res.json(orders);
    } catch (error) {
        console.error('Error al obtener las ordenes: ', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

//Agregar Order
export const addOrder = async (req, res) => {
    const items = Array.isArray(req.body) ? req.body : [req.body];
    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'El carrito de compras esta vacio' });
    }

    // Validación estricta de los campos requeridos
    const requiredKeys = ['productId', 'name', 'description', 'category', 'price', 'quantity'];
    for (const item of items) {
        for (const key of requiredKeys) {
            if (!item.hasOwnProperty(key) || item[key] === undefined || item[key] === null || item[key] === "") {
                return res.status(400).json({ message: `El campo '${key}' es requerido en cada producto de la orden` });
            }
        }
    }

    try {
        const orderData = {
            items: items.map((item) => ({
                productId: item.productId,
                name: item.name,
                description: item.description,
                category: item.category,
                price: item.price,
                quantity: item.quantity
            })),
            totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        };
        const { data, error } = await supabase.from("orders").insert([{ data: orderData }]).select();
        if (error) {
            console.error('Error al crear la orden en Supabase:', error);
            return res.status(500).json({ message: 'Error al crear la orden en Supabase' });
        }
        return res.status(201).json({ message: 'ok', order: data && data[0] ? data[0] : orderData });
    } catch (error) {
        console.error('Error al crear la orden: ', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}