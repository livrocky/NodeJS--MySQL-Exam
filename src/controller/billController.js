/* eslint-disable camelcase */
const { getBillByGroupId, addBillToDb } = require('../model/billModel');

async function billByGroupId(req, res) {
  const { group_id } = req.params;
  try {
    const billArrayByGroupId = await getBillByGroupId(group_id);
    res.json(billArrayByGroupId);
  } catch (error) {
    console.log('billArrayByGroupId===', error);
    res.sendStatus(500);
  }
}

async function addNewBill(req, res) {
  const { group_id } = req.query;
  const { amount, description } = req.body;

  try {
    const result = await addBillToDb(group_id, amount, description);
    if (result.affectedRows === 1) {
      res.status(201).json('Bill successfully added!');
      return;
    }
    res.status(400).json('Bill not added!');
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

module.exports = {
  billByGroupId,
  addBillToDb,
  addNewBill,
};
