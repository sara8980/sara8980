const pool = require('../db');
async function getLatEvent() {
try{
  const sql = 'SELECT MAX(event_code) AS max FROM my_events';
  const [rows] = await pool.query(sql);
  return rows[0]; // החזרת השורה הראשונה של התוצאה
}catch (error){
  throw error;
}
  
}

async function getCustomerEventsList(id) {
  if (!id) {
    console.error("Error: One or more of the details arenull or empty");
    return "Error: One or more of the details are null or empty";
  }
  try {
    const sql = 'SELECT *FROM my_events WHERE my_events.code_costomer = ?'; // השאילתה משתמשת בסימון של פרמטר
    const [rows, fields] = await pool.query(sql, [id]); // כאן אנו מזינים את ערך הפרמטר לשאילתה
    return rows; // אנו מניחים שיש רק תוצאה אחת
  } catch (error) {
    throw error;
  }

}

async function getMonthlyOrdersReport() {
  const sql = 'SELECT * FROM my_events JOIN business_in_event ON my_events.event_code = business_in_event.code_event JOIN business ON business_in_event.code_business = business.business_code JOIN categories ON business_in_event.code_category = categories.category_code WHERE MONTH(my_events.the_date) = MONTH(CURRENT_DATE()) AND YEAR(my_events.the_date) = YEAR(CURRENT_DATE());'
  try {
    const [rows, fields] = await pool.query(sql);
    return rows;
  } catch (error) {
    throw error;
  }
}




async function createAEvent(userId, eventName, eventDate) {
  try {
    // בדיקת ערכים נכנסים
    if (!userId || !eventName || !eventDate) {
      console.error("Error: One or more of the details are null or empty");
      return "Error: One or more of the details are null or empty";
    }

    // קבלת האירוע האחרון
    const event = await getLatEvent();
    const eventCode = parseInt(event.max) + 1;

    // הכנת שאילתת SQL
    const sql = 'INSERT INTO my_events (event_code, event_name, code_costomer, the_date, was_invited) VALUES (?,?,?,?,?)';
    
    // ביצוע השאילתה
    const [result] = await pool.query(sql, [eventCode, eventName, userId, eventDate, false]);
    
    // בדיקת התוצאה
    if (result.serverStatus == 2) {
      console.log("Added event successfully");
      return "Added event successfully";
    } else {
      console.error("Error in adding event");
      return "Error in adding event";
    }

  } catch (error) {
    // טיפול בחריגות אם משהו השתבש
    console.error("An error occurred while adding the event:", error);
    throw  error;
  }
}




module.exports = { getCustomerEventsList, getMonthlyOrdersReport, createAEvent };