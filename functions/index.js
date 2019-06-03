const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

// On sign up.
exports.processSignUp = functions.auth.user().onCreate(user => {
  const customClaims = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-default-role': 'user',
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.uid,
    },
  }

  // Set custom user claims on this newly created user.
  return admin
    .auth()
    .setCustomUserClaims(user.uid, customClaims)
    .then(() => {
      return admin
        .firestore()
        .collection('metadata')
        .doc(user.uid)
        .set({ refreshTime: new Date().getTime() })
    })
    .catch(error => {
      console.log(error)
    })
})
