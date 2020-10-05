import oauth2, { config, siteUrl } from './utils/oauth';

const renderHTML = (callback) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redirect...</title>
</head>
<body>
  <script>
    (function() {
      ${callback};
    })();
  </script>
</body>
</html>
`;

// handle Todoist auth callback
exports.handler = (event, context, callback) => {
  const { code, state } = event.queryStringParameters;

  // take the grant code and exchange for an accessToken
  oauth2.authorizationCode.getToken({
    code: code,
    redirect_uri: config.redirect_uri,
    client_id: config.clientId,
    client_secret: config.clientSecret
  })
    .then((result) => oauth2.accessToken.create(result))
    .then((result) => {
      const token = result.token.access_token;

      // Return results to browser. localState should be the same as the state
      // url parameter we get back from the Todoist request to prevent CSRF
      // attacks. If this is not the case the request might have been forged
      return callback(null, {
        statusCode: 200,
        body: renderHTML(`
          var localState = sessionStorage.getItem('state');
          if (localState !== '${state}') {
            sessionStorage.removeItem('state');
            return window.location.replace('${`${siteUrl}?error=invalid-state`}');
          };

          sessionStorage.removeItem('state');
          sessionStorage.setItem('token', '${token}');
          window.location.replace('${config.success_uri}');
        `),
        headers: {
          'Content-Type': 'text/html',
        }
      })
    })
    .catch((error) => {
      console.log('Access Token Error', error.message)
      return callback(null, {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({
          error: error.message,
        })
      })
    })
}
