const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session')
const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const knexSessionStore = require('connect-session-knex')(session)
const dbConnection = require('../database/dbConfig.js')
const User = require('../users/userRouter.js')
const server = express();

const sessionConfig = {
    name: 'cookies',
    secret: process.env.SESSION_SECRET || "keep it secret, keep it safe",
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: true,
    store: new knexSessionStore({
        knex: dbConnection,
        tablename: 'knexsession',
        sidfieldname: 'sessionid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

server.use(helmet());
server.use(cors(
     
));
server.use(express.json());
server.use(session(sessionConfig))
server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);
server.use('/api/user', User)
module.exports = server;
