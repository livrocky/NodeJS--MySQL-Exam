const express = require('express');
const { addUserToAccount, getUserAccountJoinGroup } = require('../controller/accountController');
const { validateToken } = require('../middleware');

const accountRoutes = express.Router();

accountRoutes.post('/accounts', validateToken, addUserToAccount);
accountRoutes.get('/accounts', validateToken, getUserAccountJoinGroup);

module.exports = accountRoutes;
