import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'

const { PORT = 3000 } = process.env

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev: process.env.NODE_ENV === 'development' }),
    sapper.middleware(),
  )
  .listen(PORT, err => {
    if (err) console.log('error', err)
  })
