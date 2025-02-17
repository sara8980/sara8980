const { createABusinessOwner, loginABusinessOwner } = require('../models/business_ownersModel')


async function createBusinessOwner(req, res) {
    const { code, name, email, phone, password } = req.body;
    try {
      // קריאה לפונקציה ליצירת בעל עסק
      const result = await createABusinessOwner(code, name, email, phone, password);
  
      // שליחה חזרה של התוצאה ללקוח
      res.status(200).json(result);
    } catch (error) {
      // טיפול בשגיאות במקרה של כשלון
      console.error("Error in createBusinessOwner:", error);
      res.status(500).send("Error creating business owner");
    }
  }


  async function loginBusinessOwner(req, res) {
    const { email, password } = req.query;
    try {
      // קריאה לפונקציה להתחברות בעל העסק
      const result = await loginABusinessOwner(email, password);
  
      // שליחה חזרה של התוצאה ללקוח
      res.status(200).json(result);
    } catch (error) {
      // טיפול בשגיאות במקרה של כשלון
      console.error("Error in loginBusinessOwner:", error);
      res.status(500).send("Error logging in business owner");
    }
  }


module.exports = { createBusinessOwner, loginBusinessOwner }
