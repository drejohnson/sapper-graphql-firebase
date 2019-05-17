import { from, forkJoin, ReplaySubject } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { authListener } from './auth'
import { config } from './config'

function lazyLoad() {
  const app$ = from(import('firebase/app'))
  const auth$ = from(import('firebase/auth'))
  return forkJoin(app$, auth$).pipe(
    map(([firebase]) => {
      return { ...firebase.default }
    }),
  )
}

const firebaseApp$ = new ReplaySubject(1)

lazyLoad()
  .pipe(
    tap(firebase => {
      const app = firebase.initializeApp(config)
      authListener(app)
    }),
  )
  .subscribe(app => {
    firebaseApp$.next(app)
  })

firebaseApp$.asObservable()

export { firebaseApp$ }
