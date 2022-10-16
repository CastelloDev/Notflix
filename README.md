# Notflix

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/d

## Flags

REACT_APP_UNSPLASH_PROXY_URL : The url to your unsplash proxy (ideally use the [notflix-proxy](https://github.com/CastelloDev/notflix-unsplash-proxy))
REACT_APP_IS_DEV : A dev flag for dev only features

### dev only features:

- disables api calls to prevent you from exceeding the unsplash quota
