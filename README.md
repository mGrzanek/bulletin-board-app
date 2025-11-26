# bulletin board app
This is a full-stack web app for posting and managing classified ads. It supports both anonymous and authenticated users. Logged-in users can add, edit and delete only their own ads.

This application is also a Progressive Web App (PWA) - it can be installed, works offline and loads faster thanks to caching.

Project view: https://bulletin-board-app-jpce.onrender.com/

## Features

**Main features**

* Browse all ads
* Search ads by phrase
* View a single ad
* Add / edit / delete ads only for authenticated users
* User registration & login
* Protected routes
* Persistent local cache for offline mode
* Offline status synchronized with cached ads and user data for seamless experience

**PWA Features**

* Custom service worker with:

    &ndash; static & dynamic caching

    &ndash; offline fallback
     
    &ndash; routing support
    
    &ndash; cache versioning
* Works offline using cached ads and user data stored in localStorage
* Blocks login attempts when offline to prevent errors
* Automatic resynchronization when the internet connection is restored
* Installable on: Windows / macOS / Linux (Chrome, Edge), Android, iPhone
* manifest.json with icons and install metadata
* Automatic install prompt on Android
* iOS manual installation hint
* Desktop installability


## Technologies Used

- **Frontend:** React, Redux (with Thunk middleware),  React Router, React-Bootstrap & Bootstrap, SCSS Modules, Progressive Web App (PWA)
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Security:** Session cookies, Helmet, CORS

## Routes

The application consists of subpages:
- `/` - Home page with ads & filter form
- `/ads/:id` - Single ad view
- `/ads/search/:searchPhrase` - Filter by phrase 
- `/ads/add` - Add new ad, only for logged-in users
- `/ads/edit/:id` - Edit current ad, only for logged users.
- `/register` - User registration
- `/login` - Login
- `/logout` - Logout
- `*` - 404 Not Found

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

## License

This project is licensed under the [MIT License](LICENSE).


## Author

Monika Grzanek
