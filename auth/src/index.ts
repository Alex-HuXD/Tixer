import express from 'express'

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'

const app = express()

app.use(express.json())

// routes
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

// error handler
app.use(errorHandler)

app.listen(3000, () => {
    console.log('auth svc running at port 3000!')
})
