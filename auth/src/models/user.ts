import mongoose from 'mongoose'
import { Password } from '../utils/password'

// interface describes properties required to creating a user
interface UserAttrs {
    email: string
    password: string
}
// interface describes properties of User model
interface userModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}
// interface describes properties of User Document
interface UserDoc extends mongoose.Document {
    email: string
    password: string
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id
                delete ret.password
                delete ret.__v
                delete ret._id
            },
        },
    }
)

// middleware before save()
userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done()
})

// link TS interface to Mongoose model by adding static method to schema
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, userModel>('User', userSchema)

export { User }
