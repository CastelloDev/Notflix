# Notflix

An image navigation app to cycle through images 2 images at a time, built to run emulated on a smart tv.
The application support arrow navigation as well as mouse navigation for remotes with smart cursors.
Data is currently retrieved from unsplash.

## Requirements

- An unsplash developer account
- node `v14.17.4`
- An unsplash proxy that injects your unsplash access key [notflix-unsplash-proxy](https://github.com/CastelloDev/notflix-unsplash-proxy)

## Getting started

1. To get started set your unplash proxy env var
2. Launch the unsplash proxy
3. Run `npm start`

## Flags

REACT_APP_UNSPLASH_PROXY_URL : The url to your unsplash proxy (ideally use the [notflix-proxy](https://github.com/CastelloDev/notflix-unsplash-proxy))
REACT_APP_IS_DEV : A dev flag for dev only features

### Dev only features:

- disables api calls and uses mock data instead to prevent you from exceeding the unsplash quota

## Navigation

You may navigate through this application with a mouse or utilise the arrow keys on your keyboard
