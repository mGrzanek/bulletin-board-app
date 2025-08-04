# bulletin board app
This is a full-stack web app for posting and managing classified ads. It provides a smooth and secure experience for both anonymous and authenticated users. Logged users can add, edit and delete only their own ads. Routes that require user authorization are protected.

The application consists of subpages:
- `/` – Home with ads filter form and ads.
- `/ads/:id` – Detailed view of a single ad.
- `/ads/search/:searchPhrase` – Filters ads by search phrase. 
- `/ads/add` – Form to insert new ad, only for logged users.
- `/ads/edit/:id` – Form to edit current ad, only for logged users.
- `/register` – User registration form.
- `/login` – User login form.
- `/logout` – Logs out the current user.


Project: https://bulletin-board-app-jpce.onrender.com/

## Technologies Used

- **Frontend:** React, Redux (with Thunk middleware),  React Router, React-Bootstrap & Bootstrap, SCSS Modules
- **Backend:** Node.js, Express.js, MongoDB, Mongoose

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

## Author

Monika Grzanek
