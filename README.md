# RSS Feed

A customisable RSS Feed with dynamic configuration and category based articles.

React app which pulls in data from Firebase, and grabs articles from your favourite RSS sources.

## Firebase

This project is setup using firebase:
- Hosting - For hosting the app
- Firestore - For data storage, see the [example format](docs/firestore_format.md)
- Storage - For storing custom source icons

### Setup

1. Create a Firebase account at [https://firebase.google.com](https://firebase.google.com)
2. Create a new project from the Firebase console
3. Enable Hosting, Firestore and Storage for your project in the Firebase console
5. Update .firebaserc with your Firebase project name
6. Ensure Firestore and Storage rules on the console match those in `firestore.rules` and `storage.rules` respectively
7. Update src/services/firebase.js with your Firebase project settings (you can get these from the Firebase console, under Project Settings -> Your apps -> Firebase SDK snippet -> Config)

Alternatively, here's an [article](https://dzone.com/articles/react-apps-firebase) which details the Firebase setup for the project using [firebase-tools](https://github.com/firebase/firebase-tools).

## Deployment

This project was configured using the [firebase-tools](https://github.com/firebase/firebase-tools) setup as detailed above, which includes setup of GitHub deployments.

Configuration of GitHub workflows can be found in the `.github/workflows` folder.

## Running Locally

`yarn start` will run the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

`yarn build` will build the app for production to the `build` folder.
The app is then ready for deployment!

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
