import { NextFunction, Request, Response } from 'express'
import { RequestValidationError } from '../errors/request-validation-error'
import { DatabaseConnectionError } from '../errors/database-connection-error'

interface CommonErrorStructure {
    errors: { message: string; field?: string }[]
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof RequestValidationError) {
        const formattedErrors: CommonErrorStructure = {
            errors: err.errors.map(err => ({
                message: err.msg,
                field: err.type,
            })),
        }
        return res.status(400).send(formattedErrors)
    }
    if (err instanceof DatabaseConnectionError) {
        const formattedErrors: CommonErrorStructure = {
            errors: [{ message: err.reason, field: 'database' }],
        }
        res.status(500).send(formattedErrors)
    }

    const formattedGenericError: CommonErrorStructure = {
        errors: [{ message: 'Something went wrong!' }],
    }

    res.status(400).send(formattedGenericError)
}
