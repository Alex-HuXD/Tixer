import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error'
import { validateRequest } from '../middlewares/validateRequest'

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
    validateRequest,
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

        return res.send(user).status(201)
    }
)

export { router as signupRouter }
