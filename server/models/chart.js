var db = require('./index')
var JsonField = require('sequelize-json')

module.exports = (sequelize, DataTypes) =>
  sequelize.define('Chart', {
    user: DataTypes.STRING,
    chart: JsonField(db, 'Chart', 'chart')
  })
