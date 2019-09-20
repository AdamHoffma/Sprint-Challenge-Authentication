const router = require('express').Router();
const bcrypt = require('bcryptjs')
const Users = require('../users/users-model.js')
const jwt = require('jsonwebtoken')

router.post('/register', (req, res) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

router.post('/login', (req, res) => {
  let {username, password} = req.body
  Users.findBy({username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
        res.status(200).json({message: `Welcome ${user.username}!`, token})
      } else {
        res.status(401).json({message: 'You shall not pass'})
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

router.get('/logout', (req, res) => {
  if(req.session) {
    req.session.destroy(error => {
      if(error) {
        res.status(200).json({message: 'You cannot leave'})
      }
    })
  } else {
    res.status(200).json({message: 'We never liked you anyhow.... Please Come Back!!!!'})
  }
})

function generateToken(user) {
  const payload = {
      username: user.username
  }
  const secret = 'keep it secret, keep it safe'
  const options = {
      expiresIn: '1d'
  }
  return jwt.sign(payload, secret, options)
}

module.exports = router;
