const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('hejsan')
})

module.exports = router
