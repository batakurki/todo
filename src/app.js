const express = require('express')
var cors = require('cors')

require('./db/mongoose')

const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use(cors())

module.exports = app
