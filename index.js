require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose")
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


//router
const userRoutes=require("./routes/userRoutes")
const productRoutes=require("./routes/productRoutes")
app.use("/",userRoutes)
app.use("/",productRoutes);



app.listen(port,()=>{
    console.log(`running on port ${port}`);
    
})