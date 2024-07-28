import express from 'express'
import 'express-async-errors'

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()

app.use(express.json())

// routes
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

// not found handler
app.all('*', async () => {
    throw new NotFoundError()
})

// error handler
app.use(errorHandler)

app.listen(3000, () => {
    console.log('auth svc running at port 3000!')
})
