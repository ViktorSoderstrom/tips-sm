const shl = require('open-shl')
const config = require('../config/shl')
console.log('hejsan')
const client = shl.connect(config)

module.exports = {
  async getTeams(req, res) {
    try {
      client.teams().then(teams => {
        res.send(teams)
      })
    } catch (err) {
      res.status(400).send({
        error: 'Något gick fel ' + err
      })
    }
  },
  async getStandings(req, res) {
    try {
      client
        .season(2019)
        .statistics.teams.standings()
        .then(standings => {
          res.send(standings)
        })
    } catch (err) {
      res.status(400).send({
        error: 'Något gick fel ' + err
      })
    }
  },
  async getTodaysGames(req, res) {
    try {
      client
        .season(2019)
        .games()
        .then(games => {
          res.send(games)
        })
    } catch (err) {
      res.status(400).send({
        error: 'Något gick fel ' + err
      })
    }
  }
}
