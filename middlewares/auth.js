const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    const token = req.cookies['jwt'];
    if (!token) {
        console.log('faling here, 1');
        res.status(401).send('Unauthorized!!');
        return;
    }

    try {
        const data = jwt.verify(token, process.env.JWT_KEY);

        const user = await User.findOne({ userName: data.userName });
        if(!user) {
            console.log('faling here, 2');
            res.status(401).send('Unauthorized!!');
            return;
        }

        req.user = user;
    } catch (err) {
        console.log('faling here, 3');
        res.status(401).send('Unauthorized!!');
    }

    next();
}

module.exports = {
    auth
}