const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fluxo_caixa',
  password: 'Novonoia1!',
  port: 5432,
})

const getAllTransactions = (request, response) => {
  pool.query('SELECT * FROM "Transacao"', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getSalesPerMonth = (request, response) => {
  pool.query(
    'SELECT EXTRACT(YEAR FROM "DATA")::int AS year, ' +
    ' EXTRACT(MONTH FROM "DATA")::int AS month, ' +
    ' TRIM(TO_CHAR("DATA",' + "'Month'" + ')) AS "monthText",' +
    ' SUM("VALOR") AS TotalSales ' +
    ' FROM public."Transacao" ' +
    ' GROUP BY EXTRACT(YEAR FROM "DATA"), EXTRACT(MONTH FROM "DATA"), TO_CHAR("DATA",' + "'Month'" + ')' +
    ' ORDER BY EXTRACT(YEAR FROM "DATA"), EXTRACT(MONTH FROM "DATA"),TO_CHAR("DATA",' + "'Month'" + ')', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({ "items": results.rows })
    })
}

module.exports = {
  getAllTransactions,
  getSalesPerMonth
}