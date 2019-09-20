const request = require('supertest')
const server = require('./server.js')
const db = require('../database/dbConfig.js')
const bcrypt = require('bcryptjs')

describe('server', () => {
    beforeEach(async () => {
        await db('users').truncate()
    })
describe('POST /REGISTER', () => {
    it('should return 201 status', () => {
        return request(server).post('/api/auth/register')
        .send({
            username: "AdamH",
            password: "winter"
        })
        .set('Content-Type', 'application/json')
        .then(res => {
            expect(res.status).toBe(201)
            
        })
    })
    it('username should be {name}', () => {
        return request(server).post('/api/auth/register')
        .send({
            username: "henry",
            password: "password"
        })
        .set('Content-Type', 'application/json')
        .then(res => {
            expect(res.body.username).toBe("henry")
            })
        }) 
    })
}) 
describe('POST /LOGIN', ()  => {
    it('token exists', async () => {
        await db('users').insert([{
            username: "testing", password: bcrypt.hashSync("testing", 8)
        }])
        const res = await request(server).post('/api/auth/login')
            .send({
                username: "testing",
                password: "testing"
            })
            .set('Content-Type', 'application/json')
        expect(res.body.token).toBeTruthy
        token = res.body.token
        })
    it('returns status 200', () => {
        return request(server).post('/api/auth/login')
            .send({
                username: "testing",
                password: "testing"
            })
            .set('Content-Type', 'application/json')
            .then(res => {
                expect(res.status).toBe(200)
            })
    })
})

describe('GET /jokes', () => {
    it('returns 200 status', () => {
        return request(server).get('/api/jokes')
        .set('authorization', token)
        .then(res => {
            expect(res.status).toBe(200)
        })
    })
    it('returns json', () => {
        return request (server).get('/api/jokes')
        .expect('Content-Type', /json/)
    })
})