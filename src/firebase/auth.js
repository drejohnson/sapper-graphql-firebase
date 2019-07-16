import { authState } from 'rxfire/auth'
import { authStore } from '../stores/auth'

export const authListener = firebaseApp => {
  authState(firebaseApp.auth()).subscribe(async user => {
    if (user) {
      const token = await user.getIdToken(true)
      const idTokenResult = await user.getIdTokenResult()
      const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims']
      authStore.set({ status: 'in', user, token })
      if (hasuraClaim) {
        authStore.set({ status: 'in', user, token })
        localStorage.setItem('token', token)
      }
    }
  })
}

export const signInWithFacebook = firebaseApp => ({ redirect = false }) => {
  firebaseApp.subscribe(async app => {
    const authProvider = new app.auth.FacebookAuthProvider()
    try {
      redirect === true
        ? await app.auth().signInWithRedirect(authProvider)
        : await app.auth().signInWithPopup(authProvider)
    } catch (error) {
      /* eslint-disable no-console */
      console.log(error)
    }
  })
}
export const signInWithGoogle = firebaseApp => ({ redirect = false }) => {
  firebaseApp.subscribe(async app => {
    const authProvider = new app.auth.GoogleAuthProvider()
    try {
      redirect === true
        ? await app.auth().signInWithRedirect(authProvider)
        : await app.auth().signInWithPopup(authProvider)
      redirectAfterLogin()
    } catch (error) {
      /* eslint-disable no-console */
      console.log(error)
    }
  })
}

export const signOut = firebaseApp => () => {
  firebaseApp.subscribe(async app => {
    try {
      await app.auth().signOut()
      authStore.set({ status: 'out' })
      localStorage.removeItem('token')
    } catch (error) {
      /* eslint-disable no-console */
      console.log(error)
    }
  })
}
