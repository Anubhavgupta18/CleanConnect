const Pickup = require('../models/pickup-model');

const createPickup = async (req, res) => {
    try {
        const user = req.user._id;
        const { pickupStartTime, pickupEndTime, flatNo, street, city, state, pincode } = req.body;
        const pickup = new Pickup({
            user,
            address: {
                flatNo, street, city, state, pincode  
            },
            pickupStartTime,
            pickupEndTime
        });
        await pickup.save();
        return res.status(201).json({ pickup });
    } catch (error) {
        return res.status(500).json({
            message: 'Error while creating pickup',
            error: error
        });
    }
};

module.exports = {
    createPickup
};
