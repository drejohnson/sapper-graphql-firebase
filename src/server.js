import 'abort-controller/polyfill'
import 'isomorphic-unfetch'
import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'

const { PORT = 3000, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

const app = polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev: process.env.NODE_ENV === 'development' }),
    sapper.middleware(),
  )

export default app

if (dev) {
  app.listen(PORT, err => {
    if (err) console.log('error', err)
  })
}
