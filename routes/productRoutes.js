const express=require("express");
const router=express.Router();
const{ search,products,createProduct}=require("../controllers/productController");
router.post("/search",search)
router.get("/products",products)
router.post("/createProduct",createProduct)
module.exports=router;
