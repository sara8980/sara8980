const pool=require('../db')



async function getABusinessProducts(businessId) {

    if(!businessId){
        console.error("Error: One or more of the details arenull or empty");
        return "Error: One or more of the details are null or empty";
    }try{
        const sql='SELECT * FROM products WHERE code_business=?'
        const [rows, fields] = await pool.query(sql, [businessId]); // כאן אנו מזינים את ערך הפרמטר לשאילתה
        
        return rows; // אנו מניחים שיש רק תוצאה אחת
    }
   catch (error) {
    console.log (error)
    throw error;
  }

}


module.exports={getABusinessProducts}