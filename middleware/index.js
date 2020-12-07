const asyncForEach = require('@chriscdn/async-for-each')
const isObject = require('isobject')
const isFunction = require('is-function')

const {
	CustomError,
	ErrorCodes
} = require('../error')

function successObject(id, result) {
	return {
		jsonrpc: "2.0",
		result,
		...(id && {
			id
		})
	}
}

function errorObject(id, err) {

	if (err instanceof CustomError ) {
		// all good
	} else {
		const message = err.message
		err = new CustomError(ErrorCodes.INTERNALERROR)
		err.data = {internal:message}
	}

	return {
		jsonrpc: "2.0",
		error: {
			code: err.code,
			data: err.data,
			message: err.message
		},
		...(id && {
			id
		})
	}
}

const processRequest = async (req, res, methods, body) => {

	const jsonrpc = body.jsonrpc
	const methodName = body.method
	const id = body.id
	const params = body.params

	const method = methods[methodName]

	if (jsonrpc != "2.0" || methodName == null) {

		return errorObject(id, ErrorCodes.INVALIDREQUEST)

	} else if (params && !(isObject(params) || Array.isArray(params))) {

		return errorObject(id, ErrorCodes.INVALIDREQUEST)

	} else if (isFunction(method)) {
		try {
			return successObject(id, await method.call(methods, params, req, res))
		} catch (err) {
			return errorObject(id, err)
		}
	} else {
		return errorObject(id, ErrorCodes.METHODNOTFOUND)
	}

}

module.exports = methods => {

	return async (req, res) => {

		const body = req.body || {}

		if (Array.isArray(body)) {

			return res.json(await asyncForEach(body, body => processRequest(req, res, methods, body)))

		} else if (isObject(body)) {

			return res.json(await processRequest(req, res, methods, body))

		} else {

			return res.json(errorObject(null, ErrorCodes.PARSEERROR))

		}

	}

}