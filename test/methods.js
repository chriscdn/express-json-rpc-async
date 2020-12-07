const {rpcError, rpcErrorCodes} = require('../src') 


// const wait = () => new Promise(resolve => setTimeout(resolve, 1000))

module.exports = {
	async add(params, req, res) {
		return params[0] + params[1]
	},
	subtract(params, req, res) {
		return this.add([params[0], -params[1]], req, res)
	},
	boom(params, req, res) {
		// throw new rpcError(rpcErrorCodes.INTERNALERROR)
		throw new Error('hello oops')
	}
}