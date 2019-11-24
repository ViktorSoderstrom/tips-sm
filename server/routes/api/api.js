const express = require('express')
const mongodb = require('mongodb')

const db = require('../../services/db')
const shl = require('../../services/shl')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('hejsan')
})
router.post('/save-chart', db.saveChart)
router.get('/get-teams', shl.getTeams)
router.get('/get-standings', shl.getStandings)
router.get('/get-all-charts', db.getAllCharts)
router.get('/get-todays-games', shl.getTodaysGames)

module.exports = router
