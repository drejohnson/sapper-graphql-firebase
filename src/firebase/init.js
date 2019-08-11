import { from, forkJoin, ReplaySubject } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { authListener } from './auth'
import { config } from './config'

export function lazyLoad() {
  // create observable from dynamic import
  const firebase$ = from(import('firebase/app'))
  const auth$ = from(import('firebase/auth'))

  // uncomment to use
  // const firestore$ = from(import('firebase/firestore'))

  // when all observables, e.g (firebase$, auth$), complete, give the last emitted value from each as an array

  // To use firestore add firestore$ to forkJoin
  return forkJoin(firebase$, auth$).pipe(
    // apply transform to array emitted from forkJoin to return Firebase instance
    map(([firebase$]) => {
      const firebase = firebase$.default
      return { firebase }
    }),
  )
}

// create subject to replay/emit the Firebase instance to all new subscribers
const firebaseApp$ = new ReplaySubject(1)

lazyLoad()
  .pipe(
    // perform side-effect to initialize auth listener
    tap(load => {
      const { firebase } = load
      const app = firebase.initializeApp(config)
      authListener(app)
    }),
  )
  .subscribe(load => {
    const { firebase } = load
    firebaseApp$.next(firebase)
  })

export { firebaseApp$ }
