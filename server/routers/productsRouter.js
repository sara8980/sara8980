const express = require('express')
const productsRouter=express.Router();

const{  getBusinessProducts   }=require("../controllers/productsController")
productsRouter.route('/:businessId')
.get(getBusinessProducts);
    




module.exports=productsRouter

