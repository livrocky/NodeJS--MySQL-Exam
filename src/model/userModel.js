const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

// EXECUTE //

async function executeDb(sql, dataToDbArr) {
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

function addUserToDb(fullName, email, password) {
  const sql = 'INSERT INTO users(fullName, email, password) VALUES (?, ?, ?)';
  return executeDb(sql, [fullName, email, password]);
}

function findUserByEmail(email) {
  const sql = `
  SELECT * FROM users WHERE email = ?`;
  return executeDb(sql, [email]);
}

module.exports = {
  addUserToDb,
  findUserByEmail,
};
