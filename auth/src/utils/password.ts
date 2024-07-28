import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt)

export class Password {
    static toHash = async (password: string) => {
        const salt = randomBytes(8).toString('hex')
        const buffer = (await scryptAsync(password, salt, 64)) as Buffer

        return `${buffer.toString('hex')}.${salt}`
    }

    static compare = async (savedPassword: string, providedPassword: string) => {
        const [hashedPassword, salt] = savedPassword.split('.')
        const providedPasswordBuffer = (await scryptAsync(providedPassword, salt, 64)) as Buffer

        return providedPasswordBuffer.toString('hex') === hashedPassword
    }
}
