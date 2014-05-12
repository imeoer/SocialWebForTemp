database = require('./database')

class Model

	constructor: () ->

		that = @

	login: (req, res) ->

		userName = req.body.user_name
		passWord = req.body.pass_word

		database.user.findOne {user_name: userName, pass_word: passWord}, (err, result) ->

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

		database.user.findOne {user_name: userName}, (err, result) ->

			if result

				res.end(JSON.stringify({
					success: false,
					data: '用户已被注册'
				}))

			else

				database.user.insert {
					user_name: userName,
					pass_word: passWord
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

	publish: (req, res) ->

		userName = req.session.user_name

		if userName

			articleTitle = req.body.article_title
			articleContent = req.body.article_content
			articleTags = req.body.article_tags

			articleTagsAry = articleTags.split(',')
			
			database.article.insert {
				user_name: userName,
				article_title: articleTitle,
				article_content: articleContent,
				article_tags: articleTagsAry
			}, (err, result) ->

				if result

					res.end(JSON.stringify({
						success: true,
						data: '发布成功'
					}))

				else

					res.end(JSON.stringify({
						success: false,
						data: '发布失败'
					}))

		else

			res.end(JSON.stringify({
				success: false,
				data: '请先登录'
			}))

	listMyArticle: (req, res) ->

		userName = req.session.user_name

		if userName

			database.article.find {user_name: userName}, (err, results) ->

				if results and results.length

					res.end(JSON.stringify({
						success: true,
						data: results
					}))

				else

					res.end(JSON.stringify({
						success: false,
						data: '还未发布任何文章'
					}))

		else

			res.end(JSON.stringify({
				success: false,
				data: '请先登录'
			}))

	listAllArticle: (req, res) ->

		database.article.find {}, (err, results) ->

			if results and results.length

				res.end(JSON.stringify({
					success: true,
					data: results
				}))

			else

				res.end(JSON.stringify({
					success: false,
					data: '还未发布任何文章'
				}))

	index: (req, res) ->

		userName = req.session.user_name || '匿名用户'
		res.render('index', {user_name: userName})

module.exports = new Model()