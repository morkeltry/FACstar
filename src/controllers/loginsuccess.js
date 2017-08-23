require('env2')('./config.env');
const request = require ('request');
const queryString = require('querystring');
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const loginSuccess = {};
loginSuccess.get = (req, responseToUser) => {

    if (false) {      ///check isAuthenticated
      return reply.redirect('/');   //ooh, that's not express!
    }
    console.log ('AUTH: ',req.auth);
    const successCode = req.query.code;
    let url = 'https://github.com/login/oauth/access_token';
    url += `?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${successCode}`;
      console.log ('Req1: ',{url:url});
    request.post(url, (err, res, body) => {
      if (err) console.log(err);

      const parsed = queryString.parse(body);
      console.log (parsed);
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
      console.log ('Req2: ',{ url: url, headers });
      request.get({ url: url, headers }, (err, res, body) => {
        if (err) console.log(err);
        const parsedBody = JSON.parse(body);
        const userData = {
          id: parsedBody.id,
          username: parsedBody.login,
          name: parsedBody.name,
          pic: parsedBody.avatar_url,
        };
        console.log (userData);

        // req.cookieAuth.set({
        //   accessToken,
        //   name: userData.name,
        //   pic: userData.pic,
        //   username: userData.username,
        // });

        // saveUserData(userData, (err) => {
        //   if (err) console.log(err);
        //   reply.redirect('/');
        // });

        console.log ('AUTH: ',req.auth);
          responseToUser.render('home',{user: '@'+userData.username});
      });
    });


}

module.exports = loginSuccess;
