const User = require('../../models/User');

//get user data
module.exports.getUser = async (req, res) => {
    const { password, ...userData } = req.user.toObject();
    res.status(200).send(userData);
}

//update user data
module.exports.updateUser = async (req, res) => {
    const { name, dob } = req.body;
    console.log(req.body);

    try {
        const user = await User.findById(req.user._id);
        console.log(user.toObject());

        if(name) user.name = name;
        if(dob) user.dob = dob;
        if(req.body?.fileName) user.profilePicture = `/images/${req.body?.fileName}`;

        await user.save();
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong!');
    }
}