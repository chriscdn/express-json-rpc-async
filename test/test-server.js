const express = require('express')
const bodyParser = require('body-parser')

const 
	rpcMiddleware
 = require('../middleware')

const app = express()

app.use(bodyParser.urlencoded({
	extended: false
}))

app.use(bodyParser.json())



// app.post('/rpc/auth', rpcMiddleware(require('./auth-methods')))
app.post('/rpc', rpcMiddleware(require('./methods')))

app.listen(5000)