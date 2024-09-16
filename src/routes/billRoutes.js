const express = require('express');
const { addNewBill, billByGroupId } = require('../controller/billController');
const { validateToken } = require('../middleware');

const billRoutes = express.Router();

billRoutes.get('/bills/:group_id', validateToken, billByGroupId);
billRoutes.post('/bills', validateToken, addNewBill);

module.exports = billRoutes;
