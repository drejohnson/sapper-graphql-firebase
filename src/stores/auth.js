import { writable } from 'svelte/store'
import { auth, providers } from '../firebase'

export let authState = writable({ status: 'loading' })

auth.onAuthStateChanged(async user => {
  if (user) {
    let token = await user.getIdToken()
    let idTokenResult = await user.getIdTokenResult()
    let hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims']
    // console.log(token)
    // console.log(idTokenResult)
    // console.log(hasuraClaim)
    if (hasuraClaim) {
      authState.set({ status: 'logged-in', user, token })
      localStorage.setItem('user', user.uid)
      localStorage.setItem('token', token)
    } else {
      // Check if refresh is required.
      let metadataRef = firebase
        .database()
        .ref('metadata/' + user.uid + '/refreshTime')

      metadataRef.on('value', async () => {
        // Force refresh to pick up the latest custom claims changes.
        // Note this is always triggered on first call. Further optimization could be
        // added to avoid the initial trigger when the token is issued and already contains
        // the latest claims.
        let token = await user.getIdToken(true)
        authState.set({ status: 'logged-in', user, token })
        localStorage.setItem('user', user.uid)
        localStorage.setItem('token', token)
      })
    }
  } else {
    authState.set({ status: 'logged-out' })
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
})

export let signInWithGoogle = async () => {
  try {
    await auth.signInWithPopup(providers.google)
  } catch (error) {
    console.log(error)
  }
}

export let signOut = async () => {
  try {
    authState.set({ status: 'loading' })
    await auth.signOut()
    authState.set({ status: 'logged-out' })
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  } catch (error) {
    console.log(error)
  }
}

export default authState
