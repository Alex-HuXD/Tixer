import express from 'express'

const app = express()

// middleware
app.use(express.json())

app.get('/api/users/currentuser', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, () => {
    console.log('auth svc running at port 3000!')
})
