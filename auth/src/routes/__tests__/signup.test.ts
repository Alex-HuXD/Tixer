import request from 'supertest'
import { app } from '../../app'

it('returns 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'tests@tests.com',
            password: 'password',
        })
        .expect(201)
})

it('return 400 on invalid credentials', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'bademail',
            password: '123',
        })
        .expect(400)
})

it('return 400 with missing password or email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@email',
            password: '',
        })
        .expect(400)

    await request(app)
        .post('/api/users/signup')
        .send({
            email: '',
            password: 'passwords',
        })
        .expect(400)
})
