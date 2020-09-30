import oauth2, { config } from './utils/oauth';
import { state } from './utils/oauth-state';

// do initial auth redirect to Todoist (in case user is not logged in)
export function handler(event, context, callback) {
  const state = event.queryStringParameters.state;

  const authorizationURI = oauth2.authorizationCode.authorizeURL({
    redirect_uri: config.redirect_uri,
    scope: 'data:read,data:delete',
    state
  });

  // redirect user to authorizationURI
  const response = {
    statusCode: 302,
    headers: {
      Location: authorizationURI,
      'Cache-Control': 'no-cache' // disable caching of this response
    },
    body: '' // return body for local dev
  };

  return callback(null, response);
}
