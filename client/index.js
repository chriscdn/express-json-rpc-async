const axios = require('axios')

const {
	v4: uuidv4
} = require('uuid')

const {
	CustomError,
	ErrorCodes
} = require('../error')

class Client {

	constructor(config = {}) {
		this.axios = axios.create(config)

		this.resetQueue()
	}

	requestObject(method, params, id) {
		return {
			jsonrpc: "2.0",
			method,
			id,
			params
		}
	}

	handleResponse(data) {
		if (data.hasOwnProperty('result')) {
			return data.result
		} else if (data.hasOwnProperty('error')) {
			const err = data.error
			throw new CustomError(err.message, err.data, err.code)
		} else {
			throw new Error('The server did not respond correctly.')
		}
	}

	async request(method, params = {}, id = uuidv4()) {
		const response = await this.axios.post('',
			this.requestObject(method, params, id)
		)

		return this.handleResponse(response.data)
	}

	resetQueue() {
		this._batchQueue = []
	}

	queue(method, params = {}, id = uuidv4()) {
		this._batchQueue.push(this.requestObject(method, params, id))
		return this
	}

	async batch() {
		const queue = this._batchQueue
		this.resetQueue()
		const response = await this.axios.post('', queue)

		return response.data.map(item => this.handleResponse(item))
	}

}

module.exports = Client