// inspired by https://github.com/jonschlinkert/isobject/blob/master/index.js

module.exports = val => {
	return val != null && typeof val === 'object' && Array.isArray(val) === false;
}