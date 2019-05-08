import { config } from './firebaseConfig'

firebase.initializeApp(config)

const auth = firebase.auth()

const providers = {
  facebook: new firebase.auth.FacebookAuthProvider(),
  google: new firebase.auth.GoogleAuthProvider(),
  twitter: new firebase.auth.TwitterAuthProvider(),
}

export { auth, providers }
