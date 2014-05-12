Datastore = require('nedb')

class Nedb

	constructor: () ->

		that = @
		that.user = new Datastore({
			filename: './db/user.db',
			autoload: true
		})

		that.article = new Datastore({
			filename: './db/article.db',
			autoload: true
		})

module.exports = new Nedb()