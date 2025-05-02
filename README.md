# bulletin board app
This is fullstack app based on React, React-Redux, React-Router, Node.js, Express.js and MongoDB. Includes registration, login and post management functions with CRUD operations.

The application consists of subpages:
- Home with ads filter form and ads
- Sign up with form to register
- Sign in with login form
- Add with for to insert new ad, only for logged users
- Edit with form to edit ad, only for logged users

After clicking on "read me" button in the selected ad, the subpage of the single ad is displayed. 

Additionally, logged in users can edit and delete only their own ads.

## Configuration
To run the application, you need an `.env` file with configuration data.
Copy the .env.example file as .env:

`cp .env.example .env`

Insert your data into the key values.

Then install the necessary packages using:

`npm install`
or
`yarn install`

To start the application use: 

`npm start`
or
`yarn start`
