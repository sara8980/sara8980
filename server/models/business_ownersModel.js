const pool=require('../db')
const bcrypt=require('bcryptjs')

async function createABusinessOwner(business_owner_code,business_owner_name,email,phone,business_owner_password) {
    if (!business_owner_code || !business_owner_name || !email || !phone || !business_owner_password) {
        console.error("Error: One or more of the details are null or empty");
        return { message: 'One or more of the details are null or empty', isValid: false };
    }

    try {
        // Check if the business_owner_code already exists
        const checkCodeQuery = 'SELECT COUNT(*) AS count FROM business_owners WHERE business_owner_code = ?';
        const [codeCheckResult] = await pool.query(checkCodeQuery, [business_owner_code]);

        if (codeCheckResult[0].count > 0) {
            console.error("Error: business_owner code already exists");
            return { message: 'Change ID', isValid: false };
        }

        // Check if the email already exists
        const checkEemailQuery = 'SELECT COUNT(*) AS count FROM business_owners WHERE email = ?';
        const [eemailCheckResult] = await pool.query(checkEemailQuery, [email]);

        if (eemailCheckResult[0].count > 0) {
            console.error("Error: Eemail already exists");
            return { message: 'Change email', isValid: false };
        }

        // Create Salt with complexity of 10 (considered good for most cases)
        const salt = await bcrypt.genSalt(10);
        // Hash the password with the Salt
        const hashedPassword = await bcrypt.hash(business_owner_password, salt);

        // Insert into DB
        const sql = ' INSERT INTO business_owners (business_owner_code, business_owner_name, email, phone,business_owner_password) VALUES(?,?,?,?,?)';
        const [result] = await pool.query(sql, [business_owner_code, business_owner_name, email, phone, hashedPassword]);

        if (result.serverStatus === 2) {
            console.log("Added business_owner successfully");
            return { message: 'Added business_owner successfully', isValid: true };
        } else {
            console.error("Error in adding business_owner");
            return { message: 'Error in adding business_owner', isValid: false };
        }

    } catch (error) {
        console.error('Error during business_owner creation:', error);
        throw error;
        // return { message: 'Error during business_owner creation', isValid: false };
    }
    
}



async function loginABusinessOwner(email, business_owner_password ) {
    if(!email||!business_owner_password)
        {
         console.error("Error: One or more of the details arenull or empty");
         return "Error: One or more of the details are null or empty";
        }
        else{
            try {
                // שליפת הסיסמא המוצפנת מה-DB
                const sql = 'SELECT business_owner_code ,business_owner_name, business_owner_password FROM business_owners WHERE email = ?';
                const [rows] = await pool.query(sql, [email]);
        
                if (rows.length === 0) {
                    console.log('Costomer not found');
                    return {massage: 'Costomer not found',isValid: false};
                }
        
                const hashedPassword = rows[0].business_owner_password;
                const name=rows[0].business_owner_name
                const code=rows[0].business_owner_code
                // השוואת הסיסמא שסופקה עם הסיסמא המוצפנת
                const isMatch = await bcrypt.compare(business_owner_password, hashedPassword);  
                 console.log(business_owner_password, hashedPassword)
                 console.log(name)
                if (isMatch) {
                    console.log(`Login successful ${name}`);
                    return{massage: "Login successful",userId:code ,isValid: true}; 
                } else {
                    console.log('Invalid credentials');
                    return {massage: 'Invalid credentials',isValid: false};
                }
            } catch (error) {
                console.error('Error during login:', error);
                throw error;
            }
        }
    
    

}



module.exports={createABusinessOwner, loginABusinessOwner }