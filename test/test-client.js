const {
	Client
} = require('../src')

const client = new Client('http://localhost:5000/rpc')

// client.queue('add', [1,2])
// client.queue('add', [20,30])
// client.queue('subtract', [33,2])

// client.batch()
client.request('add', [32, 2])
	.then(result => {
		console.log(result)
	})

client.queue('add', [1, 2])
	.queue('add', [20, 30])
	.queue('subtract', [33, 2])
	.batch()
	.then(result => {
		console.log(result)
	})