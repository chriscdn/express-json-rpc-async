const ErrorCodes = {
	PARSEERROR: {
		code: -32700,
		message: "Parse error"
	},
	INVALIDREQUEST: {
		code: -32600,
		message: "Invalid Request"
	},
	METHODNOTFOUND: {
		code: -32601,
		message: "Method not found"
	},
	INVALIDPARAMS: {
		code: -32602,
		message: "Invalid params"
	},
	INTERNALERROR: {
		code: -32603,
		message: "Internal error"
	}
}

class CustomError extends Error {
	constructor(message = ErrorCodes.INTERNALERROR.message, data = null, code = ErrorCodes.INTERNALERROR.code) {
		super(message)
		this.code = code
		this.data = data
	}
}

module.exports = {
	CustomError,
	ErrorCodes
}