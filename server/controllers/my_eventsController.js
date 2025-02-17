const { getCustomerEventsList, getMonthlyOrdersReport, createAEvent } = require('../models/my_eventsModel');

async function getCustomerEventsListById(req, res) {
    const customerId = req.params.id;
    console.log(customerId)
    try {
        const events = await getCustomerEventsList(customerId);
        res.status(200).send(events);
    } catch (error) {
        console.error("Error fetching customer events:", error);
        res.status(500).send({ error: "An error occurred while fetching events" });
    }


}

async function generateMonthlyOrdersReport(req, res) {
    try {
        const report = await getMonthlyOrdersReport();  // מקבל את הדוח
        res.status(200).send(report);  // שולח את הדוח עם קוד 200
    } catch (error) {
        console.error("Error generating monthly orders report:", error);  // מדפיס את השגיאה בקונסול
        res.status(500).send({ error: "An error occurred while generating the report" });  // שולח שגיאה עם קוד 500
    }

}

async function createEvent(req, res) {
    const { userId, eventName, eventDate } = req.body
    console.log(req.body)
    console.log(userId, eventName, eventDate)
    try {
        res.send(await createAEvent(userId, eventName, eventDate));
    }catch(error){
        console.error("Error creating event:", error); 
        res.status(500).send({ error: "An error occurred while creating the event" }); 
    }
   
}






module.exports = { getCustomerEventsListById, generateMonthlyOrdersReport, createEvent }