/* eslint-disable prefer-destructuring */
/* eslint-disable newline-per-chained-call */
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');

// middleware helper
function showBody(req, res, next) {
  if (req.method === 'POST') {
    console.log('request body ===', req.body);
  }
  next();
}

async function validateUser(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().trim().min(5).max(10).required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('schema.validateAsync===', error);
    res.status(400).json(error.details);
  }
}

// TOKEN VALIDATION //

async function validateToken(req, res, next) {
  const tokenFromHeaders = req.headers.authorization?.split(' ')[1];
  console.log('req.headers.authorization===', req.headers.authorization);
  if (!tokenFromHeaders) {
    res.status(401).json({
      success: false,
      error: 'no token',
    });
    return;
  }

  try {
    const tokenPayload = jwt.verify(tokenFromHeaders, jwtSecret);
    const userId = tokenPayload.userId;
    req.userId = userId;
    console.log('tokenPayload===', tokenPayload);
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      error: 'invalid token',
    });
  }
}

module.exports = {
  showBody,
  validateUser,
  validateToken,
};