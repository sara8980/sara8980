const pool=require('../db');
const bcrypt = require('bcryptjs');


async function getALLCustomers(){
    try{
        const sql='SELECT * FROM customers'
        const [rows,fields]= await pool.query(sql);
        return rows;
    }catch(error){
        console.error('Error during get customers:', error);
        throw error
    }


}

async function createACustomer(customer_code, customer_name, email, phone, customer_password) {
    if (!customer_code || !customer_name || !email || !phone || !customer_password) {
        console.error("Error: One or more of the details are null or empty");
        return { message: 'One or more of the details are null or empty', isValid: false };
    }

    try {
        // Check if the customer_code already exists
        const checkCodeQuery = 'SELECT COUNT(*) AS count FROM customers WHERE customer_code = ?';
        const [codeCheckResult] = await pool.query(checkCodeQuery, [customer_code]);

        if (codeCheckResult[0].count > 0) {
            console.error("Error: Customer code already exists");
            return { message: 'change ID', isValid: false };
        }

        // Check if the eemail already exists
        const checkEemailQuery = 'SELECT COUNT(*) AS count FROM customers WHERE email = ?';
        const [eemailCheckResult] = await pool.query(checkEemailQuery, [email]);

        if (eemailCheckResult[0].count > 0) {
            console.error("Error: Eemail already exists");
            return { message: 'change mail', isValid: false };
        }

        // Create Salt with complexity of 10 (considered good for most cases)
        const salt = await bcrypt.genSalt(10);
        // Hash the password with the Salt
        const hashedPassword = await bcrypt.hash(customer_password, salt);

        // Insert into DB
        const sql = 'INSERT INTO customers (customer_code, customer_name, email, phone, customer_password) VALUES (?, ?, ?, ?, ?)';
        const [result] = await pool.query(sql, [customer_code, customer_name, email, phone, hashedPassword]);

        if (result.serverStatus === 2) {
            console.log("Added customer successfully");
            return { message: 'signUp secces', isValid: true };
        } else {
            console.error("Error in adding customer");
            return { message: 'Error in adding customer', isValid: false };
        }

    } catch (error) {
        console.error('Error during customer creation:', error);
        // return { message: 'Error during customer creation', isValid: false };
       throw error;
    }
}

async function loginACustomer(email,customer_password) {
    if(!email||!customer_password)
        {
         console.error("Error: One or more of the details arenull or empty");
         return "Error: One or more of the details are null or empty";
        }
        else{
            try {
                // שליפת הסיסמא המוצפנת מה-DB
                const sql = 'SELECT customer_code,customer_name, customer_password FROM customers WHERE email = ?';
                const [rows] = await pool.query(sql, [email]);
        
                if (rows.length === 0) {
                    console.log('Costomer not found');
                    return {massage: 'Costomer not found',isValid: false};
                }
        
                const hashedPassword = rows[0].customer_password;
                const name=rows[0].customer_name
                const code=rows[0].customer_code
                // השוואת הסיסמא שסופקה עם הסיסמא המוצפנת
                const isMatch = await bcrypt.compare(customer_password, hashedPassword);  
                 console.log(customer_password, hashedPassword)
                 console.log(name)
                if (isMatch) {
                    console.log(`login secces ${name}`);
                    return{massage: 'login secces', userId:code,isValid: true}; 
                } else {
                    console.log('user not exis');
                    return {massage: 'password error',isValid: false};
                }
            } catch (error) {
                console.error('Error during login:', error);
                throw error;
            }
        }
    
}
module.exports={createACustomer ,getALLCustomers,loginACustomer}