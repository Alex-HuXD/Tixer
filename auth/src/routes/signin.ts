import express from 'express'

const router = express.Router()

router.post('/api/users/singin', async (req, res) => {
    res.send('signing in!')
})

export { router as signinRouter }
