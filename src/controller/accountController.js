/* eslint-disable camelcase */
const { addUserAccountDB, getUserAccountJoinGroupDB } = require('../model/accountModel');

async function addUserToAccount(req, res) {
  const { group_id, user_id } = req.body;
  const tokenFromHeaders = req.headers.authorization.split(' ')[1];
  const idfromToken = req.userId;
  console.log(group_id, user_id, tokenFromHeaders);
  console.log('idfromtoken', idfromToken);

  try {
    const saveResult = await addUserAccountDB(group_id, idfromToken);
    if (saveResult.affectedRows === 1) {
      res.sendStatus(201);
      return;
    }
    res.status(400).json('Account added');
  } catch (error) {
    console.log('POST /accounts ===', error);
    res.sendStatus(500);
  }
}

async function getUserAccountJoinGroup(req, res) {
  const idfromToken = req.userId;
  try {
    const accountGroupArr = await getUserAccountJoinGroupDB(idfromToken);
    res.json(accountGroupArr);
  } catch (error) {
    console.log('Get UserAccountJoinGroup error ===', error);
    res.sendStatus(500);
  }
}

module.exports = {
  addUserToAccount,
  getUserAccountJoinGroup,
};
