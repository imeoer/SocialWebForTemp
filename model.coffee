database = require('./database')

class Model

	constructor: () ->

		that = @

	login: (req, res) ->

		userName = req.body.user_name
		passWord = req.body.pass_word

		database.user.find {user_name: userName, pass_word: passWord}, (err, result) ->

			if result

				req.session.user_name = userName

				res.end(JSON.stringify({
					success: true,
					data: ''
				}))

			else

				res.end(JSON.stringify({
					success: false,
					data: '账户或密码错误'
				}))

	register: (req, res) ->

		userName = req.body.user_name
		passWord = req.body.pass_word

		database.user.insert {
			user_name: 'test',
			pass_word: 'test'
		}, (err, result) ->

			if result

				res.end(JSON.stringify({
					success: true,
					data: '注册成功'
				}))

			else

				res.end(JSON.stringify({
					success: false,
					data: '注册失败'
				}))

	index: (req, res) ->

		userName = req.session.user_name || '匿名用户'
		res.render('index', {user_name: userName})

module.exports = new Model()