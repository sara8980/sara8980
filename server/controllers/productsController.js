
const {getABusinessProducts}=require('../models/productsModel')
async function getBusinessProducts(req,res) {
   const {businessId} =req.params
   console.log(req.params)
   console.log(businessId)
   try {
      res.send(await getABusinessProducts(businessId));  // שולח את התשובה עם קוד 200
  } catch (error) {
      console.error("Error fetching business products:", error);  // מדפיס את השגיאה בקונסול
      res.status(500).send({ error: "An error occurred while fetching business products" });  // שולח שגיאה עם קוד 500
  }

}


module.exports={getBusinessProducts}

