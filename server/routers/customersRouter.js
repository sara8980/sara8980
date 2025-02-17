const express = require('express');
const customersRouter = express.Router();
const { getAllCustomers, getCustomerById, createCustomer, loginCustomer } = require('../controllers/customersController')


customersRouter.route('/')
 

customersRouter.route('/logIn')
    .get(loginCustomer)//login

customersRouter.route('/signUp')
    .post(createCustomer)//signUp


customersRouter.route('/:id')
    .get(async (req, res) => {
        const customer = await getCustomerById(req.params.id);
        // res.send(customer)
        res.send(`User ${req.params.id}`);
    })
    .put(async (req, res) => {
        const customerId = req.params.id;
        const updatedCustumerData = req.query;
        console.log(updatedCustumerData)
        const success = await updateCake(customerId, updatedCustumerData);
        res.send("the customer updated successfuly");
    });



module.exports = customersRouter;