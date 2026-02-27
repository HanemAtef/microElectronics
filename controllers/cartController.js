//addToCart
//removeItem
//getCart
//updateCart
//Validate stock
//calculateTotal
//clearCart
const Product=require("../models/Product")
const Cart=require("../models/Cart")
const User=require("../models/User")
//add to cart
const addToCartController=async(req,res)=>{
try{
    //get data
const{quantity,userId,productId}=req.body;
   //validate
if(!quantity ||!userId ||!productId)return res.status(400).json({
    msg:"missing data"
})

const user=await User.findById(userId);
if(!user)return res.status(404).json({
    msg:"user not found"
})

const product=await Product.findById(productId)
if(!product)return res.status(404).json({
    msg:"product not found"
})

if (quantity>product.stock)return res.json({
    msg:"qty larger than stock"
})

let cart =await Cart.find({user:userId})
if(!cart) await Cart.create({user,item:[]})


}
catch(err)
    {
        res.status(500).json({
            msg:err.message
        })
    }

}
//remove from cart
const removeItemConroller=async(req,res)=>{
try{

}
catch(err)
    {
        res.status(500).json({
            msg:err.message
        })
    }
}



// get cart
const getCartConroller=async(req,res)=>{
    try{

}
catch(err)
    {
        res.status(500).json({
            msg:err.message
        })
    }
}
module.exports={
    removeItemConroller,
    addToCartController,
    getCartConroller
}