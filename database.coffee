Datastore = require('nedb')

class Nedb

	constructor: () ->

		that = @
		
		# 创建用户数据库
		that.user = new Datastore({
			filename: './db/user.db',
			autoload: true
		})
		
		# 创建文章数据库
		that.article = new Datastore({
			filename: './db/article.db',
			autoload: true
		})

module.exports = new Nedb()