# bulletin board app
This is fullstack app based on React, React-Redux, React-Router, Node.js and Express.js. Includes registration, login and post management functions via CRUD operations.

The application consists of subpages:
- Home with ads filter form and ads
- Sign up with form to register
- Sing in with form to log in to account
- Add with for to insert new ad, only for logged users
- Edit with form to edit ad, only for logged users

The user has the option to edit and delete their ads. After clicking on the selected ad, the subpage of the single ad is displayed.

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
