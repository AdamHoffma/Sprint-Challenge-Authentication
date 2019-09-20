const axios = require('axios');
const restricted = require('../auth/authenticate-middleware.js')
const router = require('express').Router();
const jwt = require('jsonwebtoken')

router.get('/', restricted, (req, res) => {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      const token = generateToken
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
});

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
