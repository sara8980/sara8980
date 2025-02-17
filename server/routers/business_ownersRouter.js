const express = require('express');
const business_ownersRouter = express.Router();
const { createBusinessOwner ,loginBusinessOwner} = require('../controllers/business_ownersController')

business_ownersRouter.route('/signUp')
    .post(createBusinessOwner)

business_ownersRouter.route('/logIn')
    .get(loginBusinessOwner)

module.exports = business_ownersRouter
