import express from 'express';
import ClientOAuth2 from "client-oauth2";
const client_id = '1000.4WB608O525W587UJ5ADFCO2BU0K1JD';
const client_secret = 'b80dda8e05a920bd6b722845821556dce34613a0d4';

const zohoBookAuth = new ClientOAuth2({
    clientId:client_id,
    clientSecret: client_secret,
    accessTokenUri: 'https://accounts.zoho.com/oauth/v2/token?',
    authorizationUri:'https://accounts.zoho.com/oauth/v2/auth?',
    redirectUri:'http://localhost:3000/auth/zoho/callback',
    scopes:['ZohoBooks.fullaccess.all']
})


const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/auth/zoho', function (req, res) {
    var uri = zohoBookAuth.code.getUri()  
    res.redirect(uri)
})

app.get('/auth/zoho/callback', function (req, res) {
    zohoBookAuth.code.getToken(req.originalUrl)
      .then(function (user) {
        console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... }
  
        // Refresh the current users access token.
        user.refresh().then(function (updatedUser) {
          console.log(updatedUser !== user) //=> true
          console.log(updatedUser.accessToken)
        })
  
        // Sign API requests on behalf of the current user.
        user.sign({
          method: 'get',
          url: 'http://example.com'
        })
  
        // We should store the token into a database.
        return res.send(user.accessToken)
      })
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})