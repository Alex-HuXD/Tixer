import { CustomError } from './custom-error'

export class notAuthError extends CustomError {
    statusCode = 401
    constructor() {
        super('Not authorized')
    }

    serializeError = () => {
        return { errors: [{ message: 'Not authorized' }] }
    }
}
