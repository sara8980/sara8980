
const {getACategoriesBusiness,getABusinessBelowToBisnessman}=require('../models/businessModel')

// async function getCategoriesBusiness(req, res) {
//    const { categoryId } = req.params;
//    try {
//        const result = await getACategoriesBusiness(categoryId);  // ממתין לקבלת התוצאה
//        res.status(200).json(result);  // שולח את התוצאה עם קוד סטטוס 200
//    } catch (error) {
//        console.error("Error fetching categories business:", err);  // מדפיס את השגיאה בקונסול
//        res.status(500).send("Internal Server Error"); // שולח שגיאה עם קוד סטטוס 500
//    }
// }
async function getCategoriesBusiness(req, res) {
    const { categoryId } = req.params;
    try {
        const result = await getACategoriesBusiness(categoryId);  // ממתין לקבלת התוצאה

        // אם אין שגיאות, מחזירים את התוצאה
        res.status(200).json(result);  
    } catch (error) {
        console.error("Error fetching categories business:", error);  // מדפיס את השגיאה בקונסול
        res.status(500).send("Internal Server Error"); // שולח שגיאה עם קוד סטטוס 500
    }
}


async function getBusinessBelowToBisnessman(req, res) {
   const { busnessmanId } = req.params;

   try {
       const result = await getABusinessBelowToBisnessman(busnessmanId);  // ממתין לקבלת התוצאה
       res.status(200).json(result);  // שולח את התוצאה עם קוד סטטוס 200
   } catch (error) {
       console.error("Error fetching business below to businessman:", err);  // מדפיס את השגיאה בקונסול
       res.status(500).json({ error: "An error occurred while fetching business below to businessman" });  // שולח שגיאה עם קוד סטטוס 500
   }
}
// async function getCategoriesBusiness(req, res) {
//     try {
//         const businesses = await getACategoriesBusiness(req.params.busnessmanId);
//         res.json(businesses);
//     } catch (err) {
//         console.error("Error fetching categories business:", err); // כעת יש לך את המשתנה err
//         res.status(500).send("Internal Server Error");
//     }
// }


module.exports={getCategoriesBusiness,getBusinessBelowToBisnessman}

