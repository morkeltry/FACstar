const home = (req, res) => {
  console.log ('got / request - rendering ','home', {user:null});
  res.render('home', {user:null});
}

module.exports = home;
