const express = require('express');
const { getUserGroups } = require('../controller/groupController');
const { validateToken } = require('../middleware');

const groupRoutes = express.Router();

groupRoutes.get('/groups', validateToken, getUserGroups);

module.exports = groupRoutes;
