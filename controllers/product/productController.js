const Product = require('../../models/Product');

//Get all products
module.exports.getProducts = async (req, res) => {
    const { pageNo = 1, pageSize = 10 } = req.query;
    if(pageSize === 'INFINITE') {
        try {
            const products = await Product.find();
            res.status(200).send(products);
        } catch (error) {
            res.status(500).send('Something went wrong!');
        }

        return;
    }

    const page = parseInt(pageNo);
    const size = parseInt(pageSize)

    try {
        const totalProducts = await Product.countDocuments();
        const products = await Product.find().skip((page - 1) * size).limit(size);
        res.status(200).send({
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / size),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
}

//Get a product by id
module.exports.getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
}

//Create a new product
module.exports.createProduct = async (req, res) => {
    const { name, price, description, stock, rating } = req.body;
    console.log(name, price, description, stock, rating); 

    if(!name || !price || !description || !stock || !rating) {
        res.status(401).send('Invalid request!!');
        return;
    }

    try {
        const product = await Product.create({
            name, 
            price, 
            description, 
            stock,
            rating,
            image: req.body?.fileName? `/images/${req.body?.fileName}` : '',
        });

        res.status(200).send(product);
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
}