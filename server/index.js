const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { sequelize } = require('./models')

const app = express()

const api = require('./routes/api/api')

app.use(bodyParser.json())
app.use(cors())
app.use('/', api)

const PORT = process.env.PORT || 8081

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`server startet @ port ${PORT}`))
})
