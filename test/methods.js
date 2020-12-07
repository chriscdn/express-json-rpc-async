module.exports = {
	async add(params, req, res) {
		return params[0] + params[1]
	},
	subtract(params, req, res) {
		return this.add([params[0], -params[1]], req, res)
	}
}