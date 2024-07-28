import { CustomError } from './custom-error'

export class BadRequestError extends CustomError {
    statusCode = 400
    constructor(private reason: string) {
        super(`reason: ${reason}`)
    }

    serializeError = () => {
        return {
            errors: [
                {
                    message: this.reason,
                },
            ],
        }
    }
}
