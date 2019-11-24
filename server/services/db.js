const request = require('request')
const config = require('../config/db')
const { Chart } = require('../models')

module.exports = {
  async saveChart(req, res) {
    try {
      console.log(req.body)
      var chart = await Chart.create({
        user: req.body.name,
        chart: req.body.chart
      })
      res.send(chart)
    } catch (err) {
      res.status(400).send({
        error: 'Något gick fel vid skrivningen till databasen' + err
      })
    }
  },
  async getAllCharts(req, res) {
    try {
      var resp = await Chart.findAll()
      var charts = resp.map(c => {
        return {
          name: c.dataValues.user,
          chart: JSON.parse(c.dataValues.chart)
        }
      })
      //var charts = resp.data
      //console.log(resp.data)
      res.send(charts)
    } catch (err) {
      res.status(400).send({
        error: 'Något gick fel ' + err
      })
    }
  }
}
