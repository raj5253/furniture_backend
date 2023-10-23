const Cart = require("../models/Cart")

const addToCart = async (req, res) => {

    const { userId, cartItem, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ userId }); //userId bc its there in Cart Model
        if (cart) {
            const existingProduct = cart.products.find(product => product.cartItem.toString() == cartItem)

            if (existingProduct) existingProduct.quantity += quantity
            else cart.products.push({ cartItem, quantity })

            await cart.save(); //save is given by mongoose schema
            res.status(200).json("Product added to cart")
        } else {
            const cart = new Cart({
                userId,
                products: [
                    { cartItem: cartItem, quantity: quantity } //why not direct cartItem
                ]
            })
            await cart.save()
            res.status(200).json("Product added to cart")
        }
    } catch (error) {
        console.log("error in adding item to cart => ", error)
        res.status(500).json(error)

    }
}

const getCart = async (req, res) => {
    const userId = req.params.id

    try {
        const cart = await Cart.findOne({ userId }).populate('products.cartItem', "_id title supplier price  imageUrl")
        res.status(200).json(cart)
    } catch (error) {
        console.log("error to get cart for user => ", userId, error);
        res.status(200).json(error)
    }
}
const deleteCartItem = async (req, res) => {
    const cartItemId = req.params.cartItemId  // here cartItemId is _id of item in product array of Cart

    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { 'products._id': cartItemId },
            { $pull: { products: { _id: cartItemId } } },
            { new: true })

        if (!updatedCart) {
            return res.status(404).json("Cart Item not found")
        }
        res.status(200).json(updatedCart)
    } catch (error) {
        console.log("error in deleteCartItem => ", error);
        res.status(404).json(error)
    }
}

const decrementCartItem = async (req, res) => {

    const { userId, cartItem } = req.body //here cartItem is _id of item in cartItem array of Cart.products

    try {
        const cart = await Cart.findOne({ userId })

        if (!cart) {
            return res.status(404).json("Cart not found")
        }

        const existingProduct = cart.products.find(product => product.cartItem.toString() === cartItem)

        if (!existingProduct) return res.status(404).json("Product not found")

        if (existingProduct.quantity === 1) {
            cart.products = cart.products.filter(product => product.cartItem.toString() !== cartItem) //we compare string, but in higher work, we should comapre the _id of product
        }
        else {
            existingProduct.quantity -= 1
        }

        await cart.save()

        if (existingProduct.quantity === 0) {
            await Cart.updateOne({ userId }, { $pull: { products: { cartItem } } })
        }
        res.status(200).json("Product updated")
    }
    catch (error) {
        res.status(500).json(error)
    }

}
module.exports = {
    addToCart,
    decrementCartItem,
    getCart,
    deleteCartItem
}