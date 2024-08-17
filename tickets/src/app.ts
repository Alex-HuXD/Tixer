import 'express-async-errors'
import express from 'express'
import cookieSession from 'cookie-session'
import { errorHandler, BadRequestError } from '@xd-dev/tixer-common'

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

// not found handler
app.all('*', async () => {
    throw new BadRequestError('page not found')
})

// error handler
app.use(errorHandler)

export { app }
