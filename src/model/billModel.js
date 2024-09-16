/* eslint-disable camelcase */
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function executeToDb(sql, dataToDbArr) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, dataToDbArr);
    return result;
  } catch (error) {
    console.log('error executeDb', error);
    throw error;
  } finally {
    conn?.end();
  }
}

function getBillByGroupId(group_id) {
  const sql = 'SELECT * FROM bills WHERE group_id = ?';
  return executeToDb(sql, [group_id]);
}

function addBillToDb(group_id, amount, description) {
  const sql = 'INSERT INTO bills (group_id, amount, description) VALUES (?, ?, ?)';
  return executeToDb(sql, [group_id, amount, description]);
}

module.exports = {
  getBillByGroupId,
  addBillToDb,
};
