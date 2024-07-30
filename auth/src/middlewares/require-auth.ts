import { Request, Response, NextFunction } from 'express'
import { notAuthError } from '../errors/not-auth-error'

//this middleware need to be after current-user

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        throw new notAuthError()
    }
    next()
}
