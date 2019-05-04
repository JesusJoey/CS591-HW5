# CS591-HW5
## Frontend
On the frontend, I import { AuthService, AppGlobals } from 'angular2-google-login';
Angular-JS on the client, with AngularJS test web-server.js pointed at localhost:3000
We can log in, get the data and log out.

## Backend
On the backend, I implement the OAuth login using the Passport and Mongoose package.
Node server pointed at localhost:8000.

For passport authentification we need four things:
1. Our client ID, that you get when you register an application with Google.
2. Our client secret, which we get from the same place we got the client ID.
3. A callback URL, this should be the url that you want Google to redirect to you when you logged in. 
Finally a function that you want to call when you are returned. In this function, I store the token into the appropriate users record in the database.
