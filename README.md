# cryptoolkit / Crypto Toolkit

This project is a React + Electron App for observing and trading crypto

## Todo

- [x] Extract CoinbaseProFeed for use in multiple components
- [x] Make a current-btc-usd string component and use that instead of ^
- [ ] Customize app (favicon, title, readme, etc)
- [x] Implement Electron
- [x] Add build directions to README.md
- [x] Implement new scripts to only have to run one script to run & one script to build (https://itnext.io/4-solutions-to-run-multiple-node-js-or-npm-commands-simultaneously-9edaa6215a93)
- [ ] Implement NotificationManager and Notify (rename)
- [ ] Tie Notif-Man & Notif into Notif-Form & List


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run electron-start`

Runs the electron app. Must have the react app running in another console via `npm start`.

### `npm run electron-pack`

Runs electron-builder --dir to test prior to electron-dist.

### `npm run electron-dist`

Runs electron-builder. Must have already built the React App via `npm run build`.

## Run as Dev Instructions

### Run as React App (no Electron)

* `npm start`
* Open browser tab and navigate to http://localhost:3000

### Run as Electron App

* `npm start`
* Open new console tab
* `npm run electron-start`

## Build Instructions

If you would rather build locally rather than using the most recent Release, here are the instructions.

* `npm run build`
* `npm run electron-dist`

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
