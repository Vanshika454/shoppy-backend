const { USER_TYPES } = require('../config/constants');

const admin = async (req, res, next) => {
    const user = req.user;
    if(!user) {
        res.status(500).send('Something went wrong!');
        return;
    }

    if(user.role !== USER_TYPES.ADMIN) {
        console.log('faling here, 4');
        res.status(401).send('Unauthorized!!');
        return;
    }

    next();
}

module.exports = {
    admin
}