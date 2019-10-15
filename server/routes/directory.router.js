const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Gathers all nonprofits from the database who have been approved
router.get('/', (req, res) => {
  if (!req.query.q){
    let queryText = `SELECT "categories".name AS "category_name", "nonprofit".name, "nonprofit".address, "nonprofit".city, "nonprofit".id, "nonprofit".logo,
       "nonprofit".last_confirmed, "nonprofit".zip_code, "nonprofit".state FROM "categories" FULL OUTER JOIN "nonprofit" ON "nonprofit".category_id = "categories".id
       WHERE "is_approved" ORDER BY "name";`;
  pool.query(queryText)
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('error in directory GET', error);
    res.sendStatus(500);
  });
} else {
    let search = '%' + req.query.q + '%';
    let queryText = `SELECT * FROM "nonprofit" WHERE "name" ILIKE $1 OR "description" ILIKE $1 ORDER BY "name";`;
    if(req.user.name === 'Admin') {
      queryText = `SELECT * FROM "nonprofit" WHERE "name" ILIKE $1 OR "description" ILIKE $1 ORDER BY "last_confirmed";`;
    }
    pool.query(queryText, [search])
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log('error in search GET', error);
      res.sendStatus(500);
    });
}
});

module.exports = router;