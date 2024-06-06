const Order = require('../../models/Order');
const Product = require('../../models/Product');
const mongoose = require('mongoose');

//Created a new order
module.exports.createOrder = async (req, res) => {
    const { productsWithQuantity } = req.body; // [{productId, quantity}]

    try {
        //check all products are available
        for (let item of productsWithQuantity) {
            const product = await Product.findById(item.product._id);
            if (!product) { 
                return res.status(404).send('Product not found');
            }

            const stock = product.stock;
            if (stock < item.quantity) {
                return res.status(400).send('Not enough quantity');
            }
        }

        //update stock
        for (let item of productsWithQuantity) {
            const product = await Product.findById(item.product._id);
            product.stock -= item.quantity;
            await product.save();
        }

        const order = new Order({
            user: req.user._id,
            products: productsWithQuantity.map(item => ({
                product: new mongoose.Types.ObjectId(item.product._id),
                quantity: item.quantity
            })),
        });
        await order.save();
        console.log(order);

        res.status(200).send(order);
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong!');
    }
}

//Get all orders of a user
module.exports.getUserOrders = async (req, res) => {

    const { userId } = req.params;
    const user = req.user;
    if (userId !== user._id.toString()) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const orders = await Order.find({ user: userId }).populate('products.product');
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
}

//Get all orders
module.exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('products.product');
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
}

//Get order by Id
module.exports.getOrderById = async (req, res) => {
    const { id } = req.params;
    const user = req.user;

    try {
        const order = await Order.findById(id).populate('products.product');
        if(!order) {
            res.status(401).send('Order not found!');
            return;
        }

        if(order.user.toString() !== user._id.toString()) {
            res.status(401).send('You are not authorized to delete this tweet!');
            return;
        }

        res.status(200).send(order);
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
}