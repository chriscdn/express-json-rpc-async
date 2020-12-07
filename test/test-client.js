const Client = require('../client')
const get = require('lodash.get')
const client = new Client('http://localhost:5000/rpc')

client.axios.interceptors.response.use(response => response, error => {
	if (get(error, 'response.status') === 401) {

	}

	return Promise.reject(error)
})

client.request('add', [32, 2])
	.then(result => console.log(result))
	.catch(err => console.log(err))

client
	.queue('add', [1, 2])
	.queue('add', [20, 30])
	.queue('subtract', [33, 33])
	.batch()
	.then(items => console.log(items))