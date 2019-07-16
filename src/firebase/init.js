import { from, forkJoin, ReplaySubject } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { authListener } from './auth'
import { config } from './config'

function lazyLoad() {
  // create observable from dynamic import
  const app$ = from(import('firebase/app'))
  const auth$ = from(import('firebase/auth'))
  // when all observables, e.g (app$, auth$), complete, give the last emitted value from each as an array
  return forkJoin(app$, auth$).pipe(
    // apply transform to array emitted from forkJoin to return Firebase instance
    map(([firebase]) => {
      const app = { ...firebase.default }
      return app
    }),
  )
}

// create subject to replay/emit the Firebase instance to all new subscribers
const firebaseApp$ = new ReplaySubject(1)

lazyLoad()
  .pipe(
    // perform side-effect to initialize auth listener
    tap(firebase => {
      const app = firebase.initializeApp(config)
      authListener(app)
    }),
  )
  .subscribe(app => {
    firebaseApp$.next(app)
  })

// create observable from subject
firebaseApp$.asObservable()

export { firebaseApp$ }
