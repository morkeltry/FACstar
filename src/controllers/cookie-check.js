const currentLoggedInUser = () => {
  const user = '';

  user='@morkeltry';
  return user;
}
//
// loggedInUser.viaGithub = (accessToken, cb, cbParams) => {
//   const headers = {
//     'User-Agent': 'request',
//     Authorization: `token ${accessToken}`,
//   };
//   url = 'https://api.github.com/user';
//
//   console.log ('Req2: ',{ url: url, headers });
//   request.get({ url: url, headers }, (err, res, body) => {
//     if (err)
//       cb (cbParams,{error:err});
//     else {
//       const username = JSON.parse(body).login;
//       console.log (username);
//       cb (cbParams,username);
//     }
//   });
// }

module.exports = currentLoggedInUser;
