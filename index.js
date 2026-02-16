require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose")
const bcrypt = require('bcrypt');
const app=express();
const port=process.env.PORT||3000;
const url=process.env.URL
app.use(express.json())

async function dbConnection(){
    try{
        await mongoose.connect(url);
        console.log("connected");
        
    }
    catch(err){
        console.log(err);
        
    }
}
dbConnection();


//require models
const User=require("./models/User");
const Product=require("./models/Product");
app.post("/register", async(req,res)=>{
try{
//get data 
const {username,email,password,role}=req.body;
//validate 
if(!username || !email || !password){
    return res.status(400).json({
        msg:"missing data"
    });
}
const existUser=await User.findOne({email});
if(existUser)return res.status(400).json({msg:"user already exist"})
//create 

const hashPassword=await bcrypt.hash(password,10);
const user=await User.create({
    username,
    password:hashPassword,
    email,
    role,
})
// response
res.status(201).json({
    msg:"done created user",
    success:true,
    data:user
})}
catch(err){
    console.log({err});
    
}})




    //login
        app.post("/login",async(req,res)=>{
try{
        const {email,password}=req.body;
            if(!email || !password){
            return res.status(400).json({
                msg:"missing data"});
            }
        const user=await User.findOne({email});
            if(!user)return res.status(404).json({msg:"user not exist"})
            //match password
        const matchPassword=await bcrypt.compare(password , user.password);
            if(!matchPassword)return res.status(400).json({msg:"invalid password"})
    res.status(200).json({
    msg:"success",
}) 
    }
        
    
catch(err)
{       console.log(err);
}
})

//add product 
    app.post("/addingProduct", async (req, res) => {
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
    } catch (err) {
        console.log(err);

    }
    });

//get all product
app.get("/Products",async(req,res)=>{

try{
    const products=await Product.find();
    res.status(200).json({
        msg:"all product",
        data:products
    })
}  catch(err){
        console.log(err);
        
    }

})
//one product
app.get("/Products/search", async (req, res) => {
  try {
    const title = req.query.name;
    const products = await Product.find({ name: { $regex: title, $options: "i" } });

    res.status(200).json({
      msg: "Products found",
      data: products
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});












app.listen(port,()=>{
    console.log(`running on port ${port}`);
    
})