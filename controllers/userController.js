const User = require('../models/User')

module.exports = {

    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id); //vscode IntelliSense  gives fucntion

            res.status(200).json("Sucessfully deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    }
    ,
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id)

            if (!user) {
                res.status(401).json("User does not exist")
                return
            }

            const { password, __v, createdAt, updatedAt, ...userData } = user._doc; // ._doc is bc, monogoose.schema 
            res.status(200).json(userData)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}