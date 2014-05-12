Datastore = require('nedb')

class Nedb

	constructor: () ->

		that = @
		that.user = new Datastore({
			filename: './db/user.db',
			autoload: true
		})

module.exports = new Nedb()