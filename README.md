# cryptoolkit / Crypto Toolkit

This project is a React + Electron App for observing and trading crypto

## Todo

- [x] Extract CoinbaseProFeed for use in multiple components
- [x] Make a current-btc-usd string component and use that instead of ^
- [ ] Customize app (favicon, title, readme, etc)
- [x] Implement Electron
- [x] Add build directions to README.md
- [x] ~~Implement new scripts to only have to run one script to run & one script to build (https://itnext.io/4-solutions-to-run-multiple-node-js-or-npm-commands-simultaneously-9edaa6215a93)~~ (After trying this out... I prefer to have the app & main processes separate during development.)
- [x] Implement NotificationManager and Notify (rename)
- [x] Tie Notif-Man & Notif into Notif-Form & List
- [x] Research Babel/Webpack & ipcMain, contextBridge
- [ ] Organize & document architecture (https://saurabhshah23.medium.com/react-js-architecture-features-folder-structure-design-pattern-70b7b9103f22)
- [x] Add removeNotification event & implement in NotificationList
- [x] Add data validation on NotificationForm
- [ ] Add new prop to CoinbaseProFeed, mostRecentPrice, instead of using .once all the time
- [ ] Add feature to delete active notification
- [ ] Add Victory for graphs and make a candles graph component
- [ ] Move this shit ^ to a GitHub Project board(?)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Alias for `start-react`

### `npm run start-react`

Starts the React app with BROWSER=none (alias for `start-react-win`, use `npm run start-react-bash` if using Bash)

### `npm run start-electron`

Starts the electron app. Must have the React app running in another console via `npm run start-react`.

### `npm test`

Alias for `test-react`

### `npm run test-react`

Launches the React test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Alias for `npm run build-react`

### `npm run build-react`

Builds the React app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run build-electron`

Builds the Electron app for distribution to the `dist` folder.
Requires the `build` folder from `npm run build-react` first.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Run as Dev Instructions

* `npm start` or `npm start-react`
* Open new console tab
* `npm run start-electron`

## Build Instructions

If you would rather build locally rather than using the most recent Release, here are the instructions.

* `npm run build` or `npm run build-react`
* `npm run build-electron`

***

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
