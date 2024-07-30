import 'express-async-errors'
import mongoose from 'mongoose'
import { app } from './app'

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('env value JWT_KEY not found')
    }
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
