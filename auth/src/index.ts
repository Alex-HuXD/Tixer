import 'express-async-errors'
import mongoose from 'mongoose'
import { app } from './app'

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('env value JWT_KEY not found')
    }

    if (!process.env.MONGODB_URI) {
        throw new Error('env value MONGODB_URI not found')
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('connected to mongodb')
    } catch (err) {
        console.log('auth database connection error', err)
    }

    app.listen(3000, () => {
        console.log('auth svc running at port 3000!')
    })
}

start()
