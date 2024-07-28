import express from 'express'
import 'express-async-errors'

import mongoose from 'mongoose'

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { BadRequestError } from './errors/bad-request-error'

const app = express()

app.use(express.json())

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

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-svc:27017/auth')
        console.log('connected to mongodb')
    } catch (err) {
        console.log('auth database connection error', err)
    }

    app.listen(3000, () => {
        console.log('auth svc running at port 3000!')
    })
}

start()
