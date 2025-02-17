const express = require('express')
const businessRouter=express.Router();
const{  getCategoriesBusiness ,getBusinessBelowToBisnessman  }=require("../controllers/businessController")
businessRouter.route('/getCategoriesBusiness/:categoryId')
.get(getCategoriesBusiness);
    
businessRouter.route('/getBusinessBelowToBisnessman/:busnessmanId')
.get(getBusinessBelowToBisnessman);




module.exports=businessRouter
