const express = require('express')
const bodyParser = require('body-parser')

const {
	middleware
} = require('../src/index')

const app = express()

app.use(bodyParser.urlencoded({
	extended: false
}))

app.use(bodyParser.json())

app.post('/rpc', middleware(require('./methods')))

app.listen(5000)