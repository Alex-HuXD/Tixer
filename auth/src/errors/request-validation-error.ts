import { ValidationError } from 'express-validator'
import { CustomError } from './custom-error'

export class RequestValidationError extends CustomError {
    statusCode = 400
    constructor(public errors: ValidationError[]) {
        super('Validation error params!')
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeError() {
        const errorMessages = this.errors.map(err => ({
            message: err.msg,
            field: err.type === 'field' ? err.path : err.type,
        }))
        return {
            errors: errorMessages,
        }
    }
}
