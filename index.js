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

















app.listen(port,()=>{
    console.log(`running on port ${port}`);
    
})