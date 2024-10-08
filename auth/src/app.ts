import 'express-async-errors'
import express from 'express'
import cookieSession from 'cookie-session'
import { errorHandler, BadRequestError } from '@xd-dev/tixer-common'

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'

const app = express()
app.set('trust proxy', true)

app.use(express.json())
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
)

// routes
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

// not found handler
app.all('*', async () => {
    throw new BadRequestError('page not found')
})

// error handler
app.use(errorHandler)

export { app }
