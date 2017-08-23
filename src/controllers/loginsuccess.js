require('env2')('./config.env');
const request = require ('request');
const queryString = require('querystring');
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const loginSuccess = {};
loginSuccess.get = (req, responseToUser) => {

    if (false) {      ///check isAuthenticated
      return responseToUser.redirect('/');
    }
    const successCode = req.query.code;
    let url = 'https://github.com/login/oauth/access_token';
    url += `?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${successCode}`;
    request.post(url, (err, res, body) => {
      if (err) console.log(err);

      const parsed = queryString.parse(body);
      if (parsed.error === 'bad_verification_code')
        console.log ('and... one more time from the top.');
      if (parsed.error === 'incorrect_client_credentials')
        console.log ('oh dear, my bad');

      const accessToken = parsed.access_token;
      const headers = {
        'User-Agent': 'request',
        Authorization: `token ${accessToken}`,
      };
      url = 'https://api.github.com/user';
      request.get({ url: url, headers }, (err, res, body) => {
        if (err) console.log(err);
        const parsedBody = JSON.parse(body);
        const userData = {
          id: parsedBody.id,
          username: parsedBody.login,
          name: parsedBody.name,
          pic: parsedBody.avatar_url,
        };
        responseToUser.render('home',{user: '@'+userData.username});
      });
    });

}

module.exports = loginSuccess;
