const express=require("express");
const router=express.Router();
const{addToCartController,removeItemConroller,getCartConroller}=require("../controllers/cartController")
router.post("/addToCartController",addToCartController)
router.get("/getCartConroller",getCartConroller)
router.post("/removeItemConroller",removeItemConroller)


