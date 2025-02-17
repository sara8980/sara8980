const { getALLCustomers, createACustomer, loginACustomer } = require('../models/customersModel')

async function getAllCustomers(req, res) {
    try {
        const customers = await getALLCustomers();  // ממתין לקבלת רשימת הלקוחות
        res.status(200).send(customers);  // שולח את הרשימה עם קוד סטטוס 200
    } catch (error) {
        console.error("Error fetching customers:", error);  // מדפיס את השגיאה בקונסול
        res.status(500).send({ error: "An error occurred while fetching customers" });  // שולח שגיאה עם קוד סטטוס 500
    }
}

async function createCustomer(req, res) {
    console.log(req.body);

    const { code, name, email, phone, password } = req.body;

    console.log(code, name, email, phone, password);

    try {
        const result = await createACustomer(code, name, email, phone, password);
        // שליחה של התגובה ללקוח
        res.status(200).json(result);  // מחזיר את התוצאה עם קוד 200
    } catch (err) {
        console.error("Error creating customer:", err);  // מדפיס את השגיאה בקונסול
        res.status(500).json({ error: "An error occurred while creating the customer" });  // שולח שגיאה עם קוד 500
    }
}

    
   

async function loginCustomer(req, res) {
    const { email, password } = req.query;  // מקבל את פרטי המשתמש מה-query string
    console.log(email, password);

    try {
        const result = await loginACustomer(email, password);  // ממתין לתוצאה מהפונקציה loginACustomer
        res.status(200).json(result);  // שולח את התוצאה עם קוד סטטוס 200
    } catch (err) {
        console.error("Error logging in customer:", err);  // מדפיס את השגיאה בקונסול
        res.status(500).json({ error: "An error occurred while logging in" });  // שולח שגיאה עם קוד סטטוס 500
    }
}

module.exports = { getAllCustomers, createCustomer, loginCustomer }