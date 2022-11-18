**Made for Ironhack Full-Stack Development Bootcamp**

<h2> <img src="https://github.com/synhaptic/prep-maps-frontend/blob/main/public/logo.png" width="366" /> </h2>

**_The database for this project is no longer in use, function may be limited._**

**_This is the React section of the app. Check out the Node section <a href="https://github.com/synhaptic/prep-maps-backend" target="_blank">here</a>._**

## HIV healthcare in Miami

PrEP Maps is an interactive Google map for finding providers in Miami, Florida (Miami-Dade County) that can assist in HIV preventative healthcare. Blue pill markers denote where someone can find medicine such as PrEP or PEP and where they can find HIV testing locations. This website was made to combine all the already existing resources for HIV prevention in Miami into an accessible location for everyone to use.

## How to use

You can click on blue pill markers to see what kind of services each provider offers such as PrEP, PEP, or HIV testing and to see whether they require insurance. If you are a provider that wants to include their practice in this map, you can register and sign up in the navbar above.

## Installation

- Open command line or terminal and clone both this repo and <a href="https://github.com/thomaskno/prep-maps-backend" target="_blank">the backend repo</a> into your desired directory.

```lang-zsh
$ git clone https://github.com/synhaptic/prep-maps-frontend
$ git clone https://github.com/synhaptic/prep-maps-backend
```

- The project also has connections to a MongoDB database, Google API key, and to a specified backend port. It would be helpful to create a .env file, for both repos, and include all URLs and ports in them.

```
// .env inside the frontend repo

REACT_APP_API_URL=[Enter URL where the database API is hosted here]
REACT_APP_GOOGLE_KEY=[Enter your Google API key here]
```

```
// .env inside the backend repo

DATABASE_URL=[Enter your MongoDB database URL here]
SECRET_KEY=[Enter a secret string of characters here]
PORT=[Enter port number here]
```

- Download all the dependencies listed below in their respective repos through npm.

- Navigate to the backend repo and run nodemon on the app file.

```lang-zsh
$ nodemon app.js
```

- Navigate to the frontend repo and run npm start.

```lang-zsh
$ npm start
```

- Enjoy!

## Screenshots

<img src="https://github.com/synhaptic/prep-maps-frontend/blob/main/public/demo-1.png" /> 
<img src="https://github.com/synhaptic/prep-maps-frontend/blob/main/public/demo-2.png" /> 
<img src="https://github.com/synhaptic/prep-maps-frontend/blob/main/public/demo-3.png" />

## Dependencies used

#### React section (i.e. frontend repo)

- <a href="https://reactjs.org/" target="_blank">React</a>
- <a href="https://www.npmjs.com/package/axios" target="_blank">axios</a>
- <a href="https://www.npmjs.com/package/react-google-maps" target="_blank">@react-google-maps/api</a>
- <a href="https://www.npmjs.com/package/@reach/combobox" target="_blank">@reach/combobox</a>
- <a href="https://react-bootstrap.github.io/" target="_blank">react-bootstrap</a>
- <a href="https://www.npmjs.com/package/react-bootstrap-icons" target="_blank">react-bootstrap-icons</a>
- <a href="https://www.npmjs.com/package/react-router" target="_blank">react-router</a>
- <a href="https://www.npmjs.com/package/react-router-dom" target="_blank">react-router-dom</a>
- <a href="https://www.npmjs.com/package/use-places-autocomplete" target="_blank">use-places-autocomplete</a>
- <a href="https://www.npmjs.com/package/date-fns" target="_blank">date-fns</a>
- <a href="https://www.npmjs.com/package/animate.css/v/3.7.0" target="_blank">animate.css</a>
- <a href="https://www.npmjs.com/package/react-animated-css" target="_blank">react-animated-css</a>
- <a href="https://sass-lang.com/" target="_blank">sass</a>
- <a href="https://www.npmjs.com/package/scss" target="_blank">scss</a>
- <a href="https://www.npmjs.com/package/dotenv" target="_blank">dotenv</a>

#### Node section (i.e. backend repo)

- <a href="https://www.npmjs.com/package/express" target="_blank">express</a>
- <a href="https://www.npmjs.com/package/cors" target="_blank">cors</a>
- <a href="https://www.npmjs.com/package/mongoose" target="_blank">mongoose</a>
- <a href="https://www.npmjs.com/package/bcryptjs" target="_blank">bcryptjs</a>
- <a href="https://www.npmjs.com/package/express-validator" target="_blank">express-validator</a>
- <a href="https://www.npmjs.com/package/jsonwebtoken" target="_blank">jsonwebtoken</a>
- <a href="https://www.npmjs.com/package/dotenv" target="_blank">dotenv</a>
