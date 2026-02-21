const Product=require("../models/Product")
const User=require("../models/User")
const createProduct=async(req,res)=>{
    try {
        const { name, price, stock, userId } = req.body;
        if (!name || !price || !stock )return res.status(400).json({ msg:"Missing data"});
        const user = await User.findById(userId);
        if (!user)return res.status(404).json({ msg:"User not found"});
        if (user.role !== "admin")return res.status(403).json({ msg:"Unauthorized"});
        const product = await Product.create({ name, price, stock });
        res.status(201).json({
        msg: "Product created successfully",
        success: true,
        data: product,
        });
    }
    catch(err)
    {
        res.status(500).json({
            msg:err.message
        })
    }}


const products=async(req,res)=>{    
try{
    const products=await Product.find();
    res.status(200).json({
        msg:"all product",
        data:products
    })
}   catch(err)
    {
        res.status(500).json({
            msg:err.message
        })
    }}

const search=async(req,res)=>{ 
try {
    const title = req.query.name;
    const products = await Product.find({ name: { $regex: title, $options: "i" } });

    res.status(200).json({
      msg: "Products found",
      data: products
    });
}
catch(err)
    {
        res.status(500).json({
            msg:err.message
        })
    }
}
module.exports={
    search,
    products,
    createProduct
}