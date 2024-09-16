const { getGroups } = require('../model/groupModel');

async function getUserGroups(req, res) {
  try {
    const getGroupsArr = await getGroups();
    res.json(getGroupsArr);
  } catch (error) {
    console.log('getUserGroups error ===', error);
    res.sendStatus(500);
  }
}

module.exports = {
  getUserGroups,
};
