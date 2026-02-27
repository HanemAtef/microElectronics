
const mongoose = require("mongoose")
const itemsScema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
}, { timestamps: true })
////////////////////////////////////////////
const cartSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    item: [itemsScema]
    ,
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    }

}, { timestamps: true })

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;