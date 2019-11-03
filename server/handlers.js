const { sendJsonData, sendJsonError, getBodyJson } = require('./httpHelpers');
const { random, readJson } = require('./util');

module.exports = {
  
  async login(req, res) {

    if (req.method != 'POST')
      return Promise.reject('Wrong request method!');

      const creds = await getBodyJson(req);
      console.log('creds:');
      console.log(creds);
      const users = await readJson('users.json');
      const match = users.find(u => creds.phone == u.phone && creds.password == u.password);
      if (!match) {
        sendJsonError(res, 200, 'Invalid phone number or password');
      } else {
        sendJsonData(res, { username: match.username });
      }
  },

  async balance(req, res) {

    const balance = random(100, 1000, 100);
    const total = random(100, 1000, 100);

    sendJsonData(res, { balance, total });
    //sendJsonError(res, 404, 'Server error!');
  }
}