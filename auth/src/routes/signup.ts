import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error'

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
    async (req: Request, res: Response) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array())
        }

        // create user
        const { email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            console.log('user already exists')
            throw new BadRequestError('Email already in use')
        }
        const user = User.build({ email, password })
        await user.save()
        return res.send(user).status(201)
    }
)

export { router as signupRouter }
