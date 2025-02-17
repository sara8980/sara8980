const pool=require('../db')



// async function getACategoriesBusiness(categoryId) {

//     if(!categoryId){
//         console.error("Error: One or more of the details arenull or empty");
//         return "Error: One or more of the details are null or empty";
//     }try{
//         const sql='SELECT business_code,business_name FROM business WHERE code_category=?'
//         const [rows, fields] = await pool.query(sql, [categoryId]); // כאן אנו מזינים את ערך הפרמטר לשאילתה
//         if (rows.length === 0) {
//             console.log('No businesses found for this businessman');
//             throw new Error('No businesses found for this businessman'); // אם אין תוצאות, זורקים שגיאה
//         }
//         console.log(`secsses  ${rows[0].business_name}`)
//         console.log(rows)
//         return rows; // אנו מניחים שיש רק תוצאה אחת
//     }
//    catch (error) {
//    console.log (error)
//     throw error;
//   }

// }

async function getACategoriesBusiness(categoryId) {
    if (!categoryId) {
        console.error("Error: One or more of the details are null or empty");
        throw new Error("Error: One or more of the details are null or empty");  // הזרק שגיאה במקרה שאין `categoryId`
    }

    try {
        const sql = 'SELECT business_code, business_name FROM business WHERE code_category=?';
        const [rows, fields] = await pool.query(sql, [categoryId]); // מבצע את השאילתה

        if (rows.length === 0) {
            console.log('No businesses found for this category');
            throw new Error('No businesses found for this category'); // אם אין תוצאות, זורקים שגיאה
        }

        console.log(`Success ${rows[0].business_name}`);
        console.log(rows);
        return rows;  // מחזירים את התוצאות
    } catch (error) {
        console.error('Error in database query:', error); // מדפיסים את השגיאה
        throw error;  // זורקים את השגיאה הלאה
    }
}

async function getABusinessBelowToBisnessman(busnessmanId) {

    if(!busnessmanId){
        console.error("Error: One or more of the details arenull or empty");
        return "Error: One or more of the details are null or empty";}
        try{
        const sql='SELECT business_code,business_name FROM business WHERE code_business_owner=?'
        const [rows, fields] = await pool.query(sql, [busnessmanId]); // כאן אנו מזינים את ערך הפרמטר לשאילתה
       

        console.log(`secsses  ${rows[0].business_name}`)
        console.log(rows)
        return rows; // אנו מניחים שיש רק תוצאה אחת
    }
   catch (error) {
   console.log (error)
    throw error;
  }
  
}
// async function getABusinessBelowToBisnessman(busnessmanId) {
//     if (!busnessmanId) {
//         console.error("Error: One or more of the details are null or empty");
//         throw new Error("Error: One or more of the details are null or empty");  // הזרק שגיאה
//     }
//     try {
//         const sql = 'SELECT business_code, business_name FROM business WHERE code_business_owner=?';
//         const [rows, fields] = await pool.query(sql, [busnessmanId]); // אנו מזינים את ערך הפרמטר לשאילתה
        
//         // בודקים אם לא התקבלו תוצאות
//         if (rows.length === 0) {
//             console.log('No businesses found for this businessman');
//             throw new Error('No businesses found for this businessman'); // אם אין תוצאות, זורקים שגיאה
//         }

//         console.log(`success ${rows[0].business_name}`);
//         console.log(rows);
//         return rows; // מחזירים את התוצאות אם יש
//     } catch (error) {
//         console.error('Error in database query:', error); // מדפיסים שגיאה
//         throw new Error("Database query failed"); // זורקים שגיאה אם השאילתה נכשלה
//     }
// }



module.exports={getACategoriesBusiness,getABusinessBelowToBisnessman}