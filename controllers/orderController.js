const Order = require('../models/Order')

const getUserOrders = async (req, res) => {
    const UserId = req.params.id;

    try {
        const UserOrders = await Order.find({ UserId }).populate(
            {
                path: 'productId',
                select: "-description product_location"
            }
        ).exec();

        res.status(500).json(UserOrders)
    } catch (error) {
        console.log("error at getUserOrders=> ", error);
        res.status(500).json()
    }

}
module.exports = {
    getUserOrders
}