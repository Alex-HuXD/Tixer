import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { validateRequest } from '../middlewares/validateRequest'
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error'
import { Password } from '../utils/password'

const router = express.Router()

router.post(
    '/api/users/signin',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').trim().notEmpty().withMessage('You must provide a password'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials')
        }

        const passwordMatched = await Password.compare(existingUser.password, password)
        if (!passwordMatched) {
            throw new BadRequestError('Invalid credentials')
        }

        const userJwt = jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.email,
            },
            process.env.JWT_KEY as string
        )
        // store jwt to session
        req.session = {
            jwt: userJwt,
        }

        return res.status(201).send(existingUser)
    }
)

export { router as signinRouter }
