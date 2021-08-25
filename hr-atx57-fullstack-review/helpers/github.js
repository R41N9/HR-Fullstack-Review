const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = async (user) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  console.log('getReposByUsername has run')
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    method: 'get',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  try {
    const repos = await axios(options);
    return repos;
  } catch (err) {
    console.log('Error from getReposByUsername: ', err);
  }


}

module.exports.getReposByUsername = getReposByUsername;