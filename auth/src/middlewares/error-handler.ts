import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../errors/custom-error'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send(err.serializeError())
    }

    const formattedGenericError = {
        errors: [{ message: 'Something went wrong!' }],
    }

    res.status(400).send(formattedGenericError)
}
