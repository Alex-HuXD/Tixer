export abstract class CustomError extends Error {
    abstract statusCode: number

    constructor(message: string) {
        super(message)
    }

    abstract serializeError: () => {
        errors: {
            message: string
            field?: string
        }[]
    }
}
