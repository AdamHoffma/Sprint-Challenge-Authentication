const Users = require('./users-model.js')
const router = require('express').Router()
const restricted = require('../auth/authenticate-middleware.js')

router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(error => res.send(error))
})

module.exports = router