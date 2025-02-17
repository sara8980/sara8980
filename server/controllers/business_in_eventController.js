
const { addAOrder,getAOrderStayiesTobusinesAproval,updateAOrderToAprovalByBusiness } = require('../models/business_in_eventModel')

async function addOrder(req, res) {
   const { eventCode, categoryCode, businessCode, products } = req.body;

   try {
     let price = 0;
     products.forEach(p => {
       price += p.price * p.count;
     });
     console.log(price);
 
     // קריאה לפונקציה להוספת הזמנה ושליחה חזרה של התוצאה
     const result = await addAOrder(eventCode, categoryCode, businessCode, products, price);
     res.send(result);
   } catch (error) {
     // טיפול בשגיאות במקרה של כשלון
     console.error("Error in addOrder:", error);
     res.status(500).send("Error adding order");
   }
 }
 
 async function getOrderStayiesTobusinesAproval(req, res) {
   const { busnessId } = req.params;
 
   try {
     // קריאה לפונקציה לקבלת הזמנות שממתינות לאישור ושליחה חזרה של התוצאה
     const result = await getAOrderStayiesTobusinesAproval(busnessId);
     res.send(result);
   } catch (error) {
     // טיפול בשגיאות במקרה של כשלון
     console.error("Error in getOrderStayiesTobusinesAproval:", error);
     res.status(500).send("Error fetching order statuses for business approval");
   }
 }


 async function updateOrderToAprovalByBusiness(req, res) {
   const { aprovalOrders } = req.body;
 
   try {
     console.log("in updateOrderToAprovalByBusiness");
     // עדכון ההזמנה ותגובה עם התוצאה
     const result = await updateAOrderToAprovalByBusiness(aprovalOrders);
     res.send(result);
   } catch (error) {
     // טיפול בשגיאות
     console.error("Error in updateOrderToAprovalByBusiness:", error);
     res.status(500).send("Error updating order to approval");
   }
 }
 

module.exports = { addOrder ,getOrderStayiesTobusinesAproval,updateOrderToAprovalByBusiness}

