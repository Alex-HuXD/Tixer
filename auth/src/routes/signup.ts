import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { BadRequestError, validateRequest } from '@xd-dev/tixer-common'

import { User } from '../models/user'

const router = express.Router()

router.post(
    '/api/users/signup',
    [
        body('email').isEmail().withMessage('Email must be valid!'),
        body('password')
            .trim()
            .isLength({ min: 6, max: 20 })
            .withMessage('Password must be 6 to 20 characters long!!!'),
    ],
    [validateRequest],
    async (req: Request, res: Response) => {
        // create user
        const { email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            console.log('user already exists')
            throw new BadRequestError('Email already in use')
        }
        const user = User.build({ email, password })
        await user.save()

        // JWT
        const userJwt = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_KEY as string
        )
        // store jwt to session
        req.session = {
            jwt: userJwt,
        }
        return res.status(201).send(user)
    }
)

export { router as signupRouter }
