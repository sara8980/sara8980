const express = require('express')
const business_in_eventRouter=express.Router();
const{ addOrder  ,getOrderStayiesTobusinesAproval ,updateOrderToAprovalByBusiness}=require("../controllers/business_in_eventController")
business_in_eventRouter.route('/addOrder')
.post(addOrder);
    
business_in_eventRouter.route('/getOrderStayiesTobusinesAproval/:busnessId')
.get(getOrderStayiesTobusinesAproval);
    
business_in_eventRouter.route('/updateOrderToAprovalByBusiness')
.put(updateOrderToAprovalByBusiness);
    




module.exports=business_in_eventRouter
