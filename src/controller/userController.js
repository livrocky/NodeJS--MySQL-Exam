const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { addUserToDb, findUserByEmail } = require('../model/userModel');
const { jwtSecret } = require('../config');

async function userRegister(req, res) {
  const gautasEmail = req.body.email;
  const { fullName, password } = req.body;
  const plainTextPassword = password;
  const hashedPassword = bcrypt.hashSync(plainTextPassword, 10);
  console.log('hashedPassword===', hashedPassword);

  const newUser = {
    fullName,
    email: gautasEmail,
    password: hashedPassword,
  };
  const insertResult = await addUserToDb(newUser.fullName, newUser.email, newUser.password);
  console.log('insertResult===', insertResult);

  if (insertResult === false) {
    res.status(500).json('something wrong');
    return;
  }
  res.status(201).json('user created');
}

async function userLogin(req, res) {
  const receivedEmail = req.body.email;
  const receivedPassword = req.body.password;

  const foundUserArr = await findUserByEmail(receivedEmail);

  const foundUser = foundUserArr[0];

  console.log('foundUser===', foundUser);
  if (!foundUser) {
    res.status(400).json('email or passowrd not found (email)');
  }
  if (!bcrypt.compareSync(receivedPassword, foundUser.password)) {
    res.status(400).json('email or password not found (pass)');
  }
  const payload = { userId: foundUser.id };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
  console.log('token===', token);
  res.json({ success: true, token });
}

module.exports = {
  userRegister,
  userLogin,
};
