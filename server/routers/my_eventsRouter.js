const express =require('express');
const my_eventsRouter=express.Router();
const{getCustomerEventsListById,generateMonthlyOrdersReport,createEvent}=require('../controllers/my_eventsController')


my_eventsRouter.route('/:id')
.get(getCustomerEventsListById);
    
my_eventsRouter.route('/getMonthlyOrdersReport')
.get(generateMonthlyOrdersReport);

my_eventsRouter.route('/addEvent')
.post(createEvent);
    

module.exports=my_eventsRouter;