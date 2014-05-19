database = require('./database')

class Model

	constructor: () ->

		that = @

	index: (req, res) ->

		userName = req.session.user_name || '匿名用户'
		res.render('index', {user_name: userName})

	login: (req, res) ->

		res.render('login', {})

	upload: (req, res) ->

		res.render('upload', {})

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

			articleType = req.body.article_type
			articleImage = ''

			if articleType is 'image'

				validFile = false

				if req.files and req.files.file
					fileType = req.files.file.type
					if fileType in ['image/jpeg']
						fileName = req.files.file.path
						articleImage = fileName.split('\\')[2]
						validFile = true

				if not validFile

					res.end(JSON.stringify({
						success: false,
						data: '无效图片文件'
					}))

					return

			articleTitle = req.body.article_title
			articleContent = req.body.article_content
			articleTags = req.body.article_tags

			articleTagsAry = articleTags.split(',')
			
			database.article.insert {
				user_name: userName,
				article_title: articleTitle,
				article_content: articleContent,
				article_tags: articleTagsAry,
				article_image: articleImage,
				article_comments: [],
				publish_date: new Date()
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

	addArticleComment: (req, res) ->

		userName = req.session.user_name

		if userName

			articleId = req.body.article_id
			commentContent = req.body.comment_content

			database.article.findOne {_id: articleId}, (err, result) ->
				
				if result

					articleComments = result.article_comments
					articleComments.push({
						user_name: userName,
						comment_content: commentContent,
						date: new Date()
					})

					database.article.update {_id: articleId}, {$set: {article_comments: articleComments}}, (err, result) ->

						if result

							res.end(JSON.stringify({
								success: true,
								data: result
							}))

						else

							res.end(JSON.stringify({
								success: false,
								data: '评论失败'
							}))

				else

					res.end(JSON.stringify({
						success: false,
						data: '文章不存在'
					}))

		else

			res.end(JSON.stringify({
				success: false,
				data: '请先登录'
			}))

	forwardArticle: (req, res) ->

		userName = req.session.user_name

		if userName

			articleId = req.body.article_id

			database.article.findOne {_id: articleId}, (err, result) ->
				
				if result

					result.user_name = userName
					result.article_comments = []
					result.publish_date = new Date()
					delete result._id

					database.article.insert result, (err, result) ->

						if result

							res.end(JSON.stringify({
								success: true,
								data: '转发成功'
							}))

						else

							res.end(JSON.stringify({
								success: false,
								data: '转发失败'
							}))

				else

					res.end(JSON.stringify({
						success: false,
						data: '文章不存在'
					}))

		else

			res.end(JSON.stringify({
				success: false,
				data: '请先登录'
			}))

module.exports = new Model()