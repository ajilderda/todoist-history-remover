import simpleOauth from 'simple-oauth2';

const todoistApi = 'https://todoist.com';
// process.env.URL from netlify BUILD environment variables
export const siteUrl = process.env.URL || 'http://localhost:8888';

export const config = {
  appId: process.env.TODOIST_APP_ID,
  clientId: process.env.TODOIST_CLIENT_ID,
  clientSecret: process.env.TODOIST_CLIENT_SECRET,
  // Todoist OAuth API endpoints
  tokenHost: todoistApi,
  authorizePath: `${todoistApi}/oauth/authorize`,
  tokenPath: `${todoistApi}/oauth/access_token`,
  // redirect_uri after successful sign in
  redirect_uri: `${siteUrl}/.netlify/functions/auth-callback`,
  success_uri: `${siteUrl}/tasks`,
}

function authInstance(credentials) {
  if (!credentials.client.id) throw new Error('MISSING REQUIRED ENV VARS. Please set TODOIST_CLIENT_ID');
  if (!credentials.client.secret) throw new Error('MISSING REQUIRED ENV VARS. Please set TODOIST_CLIENT_SECRET');

  return simpleOauth.create(credentials);
}

// create oauth2 instance
export default authInstance({
  client: {
    id: config.clientId,
    secret: config.clientSecret
  },
  auth: {
    tokenHost: config.tokenHost,
    tokenPath: config.tokenPath,
    authorizePath: config.authorizePath
  }
})
