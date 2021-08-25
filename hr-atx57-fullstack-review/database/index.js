const mysql = require('mysql')
const github = require('../helpers/github.js');
const bluebird = require('bluebird');

const conn = mysql.createConnection({
  user: 'root',
  password: '',
  host: 'localhost',
  database: 'repo_list'
})

conn.connect();

const db = bluebird.promisifyAll(conn);

const save = async (req, res) => {
  console.log('save has run')
  try {
    const reposFromUser = await github.getReposByUsername(req.body.term);
    const sqlUser = `INSERT IGNORE INTO users VALUES (?, ?, ?);`;
    const userId = reposFromUser.data[0].owner.id;
    const userAvatar = reposFromUser.data[0].owner.avatar_url;
    const username = reposFromUser.data[0].owner.login;
    const queryArgsUser = [userId, userAvatar, username];
    const insertedUser = await db.queryAsync(sqlUser, queryArgsUser);
    const sqlRepo = `INSERT IGNORE INTO repos VALUES (?, ?, ?, ?, ?, ?);`;
    for (let i = 0; i < reposFromUser.data.length; i++) {
      const repoId = reposFromUser.data[i].id;
      const repoName = reposFromUser.data[i].name;
      const repoDesc = reposFromUser.data[i].description;
      const repoUrl = reposFromUser.data[i].url;
      const forkCount = reposFromUser.data[i].forks;
      const queryArgsRepo = [repoId, repoName, repoDesc, repoUrl, forkCount, userId]
      var insertedRepo = await db.queryAsync(sqlRepo, queryArgsRepo);
    }
  } catch (err) {
    console.log('Error from save: ', err)
  }
}

module.exports = {
  conn,
  save,
  db
}















// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/fetcher');

// let repoSchema = mongoose.Schema({
//   // TODO: your schema here!
// });

// let Repo = mongoose.model('Repo', repoSchema);

// let save = (/* TODO */) => {
//   // TODO: Your code here
//   // This function should save a repo or repos to
//   // the MongoDB
// }

// module.exports.save = save;