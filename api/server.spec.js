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
        return request(server).post('/auth/register')
        .send({
            username: "AdamH",
            password: "winter"
        })
        .set('Content-Type', 'application/json')
        .then(res => {
            expect(res.status).toBe(201)
            
        })
    }) 
})
}) 