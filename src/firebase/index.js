import { firebaseApp$ } from './init'
import {
  signInWithGoogle as _signInWithGoogle,
  signInWithFacebook as _signInWithFacebook,
  signOut as _signOut,
} from './auth'

export const signInWithGoogle = _signInWithGoogle(firebaseApp$)
export const signInWithFacebook = _signInWithFacebook(firebaseApp$)
export const signOut = _signOut(firebaseApp$)

export { firebaseApp$ }
