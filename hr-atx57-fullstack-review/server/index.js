const express = require('express');
const { save, db } = require('../database/index.js');
let app = express();


app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', async function (req, res) {
  console.log('post handler has run')
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  try {
    const saved = await save(req, res);
    res.status(200).send(res);
  } catch (err) {
    console.log('Error from post handler: ', err);
    res.status(400).send(err);
  }
});

app.get('/repos', async function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  var sql = `SELECT * FROM repos ORDER BY fork_count ASC LIMIT 25;`
  try {
    var result = await db.queryAsync(sql);
    res.status(200).send(result)
  } catch (err) {
    console.log('Error in get handler: ', err);
    res.status(400).send(err);
  }
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

