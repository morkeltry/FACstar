# github-express-test
Trial to use Oauth on github using express and request


request to `https://github.com/login/oauth/authorize?client_id=GITHUB_CLIENT_ID`
results in github calling back to

`http://localhost:3000/githubinterstitial/?code=SESSIONCODE`

So make a call to
```https://github.com/login/oauth/access_token?
client_id=GITHUB_CLIENT_ID&client_secret=GITHUB_CLIENT_SECRET&code=codeSESSIONCODE ```,

 making sure `User-Agent` is set in `headers`.

 Did you get
 ```
 {
error= 'bad_verification_code',
error_description,
error_uri }
```
or
```{access_token=xyz,
scope,
token_type}```?

Coolz...
So `POST` request to `https://api.github.com/user`,
with your  `User-Agent` set, and `Authorization` set to your `'token '+access_token` in `headers`.
