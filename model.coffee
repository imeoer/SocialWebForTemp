# 加载第三方库
database = require('./database')
_ = require('underscore')
fs = require('fs')

class Model

	constructor: () ->

		that = @

	indexPage: (req, res) ->

		userName = req.session.user_name || '匿名用户'
		res.render('index', {user_name: userName})

	loginPage: (req, res) ->

		res.render('login', {})

	logout: (req, res) ->

		delete req.session.user_name
		res.redirect '/login'

	uploadPage: (req, res) ->

		res.render('upload', {})

	login: (req, res) ->

		# 获取前端账户，密码字段的值
		userName = req.body.user_name
		passWord = req.body.pass_word

		# 从用户数据库中查找用户名密码是否匹配
		database.user.findOne {user_name: userName, pass_word: passWord}, (err, result) ->

			if result

				# 将用户保存在会话中，用于登录后所有操作的验证
				req.session.user_name = userName

				# 向前端返回登录成功后的数据
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

				# 向数据库插入数据
				database.user.insert {
					user_name: userName,
					pass_word: passWord,
					msgs: [],
					focus: [],
					user_nick: '',
					user_motto: ''
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

	getUserInfo: (req, res) ->

		userName = req.session.user_name

		if userName

			database.user.findOne {user_name: userName}, (err, result) ->
				
				if result

					delete result.pass_word

					res.end(JSON.stringify({
						success: true,
						data: result
					}))

				else

					res.end(JSON.stringify({
						success: false,
						data: '用户不存在'
					}))

		else

			res.end(JSON.stringify({
				success: false,
				data: '请先登录'
			}))

	updateUserInfo: (req, res) ->

		userName = req.session.user_name

		if userName

			# passWord = req.body.pass_word
			userNick = req.body.user_nick
			userMotto = req.body.user_motto

			database.user.update {user_name: userName}, {$set: {
				# pass_word: passWord,
				user_nick: userNick,
				user_motto: userMotto
			}}, (err, result) ->
				
				if result

					res.end(JSON.stringify({
						success: true,
						data: '更新用户信息成功'
					}))

				else

					res.end(JSON.stringify({
						success: false,
						data: '更新用户信息失败'
					}))

		else

			res.end(JSON.stringify({
				success: false,
				data: '请先登录'
			}))

	updateUserAvatar: (req, res) ->

		userName = req.session.user_name

		if userName

			validFile = false

			avaterImage = ''
			avaterOldPath = ''
			fileType = ''

			if req.files and req.files.file
				fileType = req.files.file.type
				if fileType in ['image/jpeg', 'image/png']
					avaterOldPath = req.files.file.path
					avaterImage = avaterOldPath.split('\\')[2]
					if not avaterImage # for linux
						avaterImage = avaterOldPath.split('/')[2]
					validFile = true

			if (not validFile) or (not avaterImage)

				res.end(JSON.stringify({
					success: false,
					data: '无效图片文件'
				}))

				return

			if fileType is 'image/jpeg'
				fs.renameSync(avaterOldPath, 'public/data/' + userName + '.jpg')
			else if fileType is 'image/png'
				fs.renameSync(avaterOldPath, 'public/data/' + userName + '.jpg')

			res.end(JSON.stringify({
				success: true,
				data: '更新头像设置成功'
			}))

		else

			res.end(JSON.stringify({
				success: false,
				data: '请先登录'
			}))

	sendPrivateMessage: (req, res) ->

		userName = req.session.user_name

		if userName

			targetUserName = req.body.target_user_name
			messageContent = req.body.message_content

			database.user.findOne {user_name: targetUserName}, (err, result) ->
				
				if result

					msgAry = result.msgs
					msgAry.push({
						from_user_name: userName,
						message_content: messageContent,
						have_read: false,
						date: new Date()
					})

					database.user.update {user_name: targetUserName}, {$set: {msgs: msgAry}}, (err, result) ->

						if result

							console.log(result);

							res.end(JSON.stringify({
								success: true,
								data: '私信发送成功'
							}))

						else

							res.end(JSON.stringify({
								success: false,
								data: '私信发送失败'
							}))

				else

					res.end(JSON.stringify({
						success: false,
						data: '用户不存在'
					}))

		else

			res.end(JSON.stringify({
				success: false,
				data: '请先登录'
			}))

	markAllMsgHaveRead: (req, res) ->

		userName = req.session.user_name

		if userName

			database.user.findOne {user_name: userName}, (err, result) ->
				
				if result

					msgAry = result.msgs

					_.each msgAry, (msgObj) ->
						msgObj.have_read = true

					database.user.update {user_name: userName}, {$set: {msgs: msgAry}}, (err, result) ->

						if result

							res.end(JSON.stringify({
								success: true,
								data: '所有私信已标记为已读'
							}))

						else

							res.end(JSON.stringify({
								success: false,
								data: '标记私信为已读失败'
							}))

				else

					res.end(JSON.stringify({
						success: false,
						data: '用户不存在'
					}))

		else

			res.end(JSON.stringify({
				success: false,
				data: '请先登录'
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
					if fileType in ['image/jpeg', 'image/png']
						fileName = req.files.file.path
						articleImage = fileName.split('\\')[2]
						if not articleImage # for linux
							articleImage = fileName.split('/')[2]
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
			articleUrl = req.body.article_url

			articleTagsAry = articleTags.split(',')
			
			database.article.insert {
				user_name: userName,
				article_title: articleTitle,
				article_content: articleContent,
				article_tags: articleTagsAry,
				article_image: articleImage,
				article_url: articleUrl,
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

			database.user.findOne {user_name: userName}, (err, result) ->

				if result

					focusUserAry = result.focus

					database.article.find {}, (err, results) ->

						if results and results.length

							# filter
							newResults = _.filter results, (resultObj, idx) ->

								if resultObj.user_name in focusUserAry or resultObj.user_name is userName
									return true
								else
									return false

							# sort
							newResults = newResults.sort (articleA, articleB) ->
								return articleA.publish_date < articleB.publish_date

							res.end(JSON.stringify({
								success: true,
								data: newResults
							}))

						else

							res.end(JSON.stringify({
								success: false,
								data: '还未有任何文章发布'
							}))

				else

					res.end(JSON.stringify({
						success: false,
						data: '用户不存在'
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

	listUserArticle: (req, res) ->

		userName = req.body.user_name

		database.article.find {user_name: userName}, (err, results) ->

			if results and results.length

				res.end(JSON.stringify({
					success: true,
					data: results
				}))

			else

				res.end(JSON.stringify({
					success: false,
					data: '该用户还未发布任何文章'
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
								data: '评论成功'
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

	focusUser: (req, res) ->

		userName = req.session.user_name

		if userName

			focusUserName = req.body.focus_user_name

			database.user.findOne {user_name: userName}, (err, result) ->

				if result

					focusFriendAry = result.focus
					newFocusFriendAry = _.union(focusFriendAry, [focusUserName])

					database.user.update {user_name: userName}, {$set: {focus: newFocusFriendAry}}, (err, result) ->

						if result

							res.end(JSON.stringify({
								success: true,
								data: '已关注该用户'
							}))

						else

							res.end(JSON.stringify({
								success: false,
								data: '关注该用户失败'
							}))

				else

					res.end(JSON.stringify({
						success: false,
						data: '用户不存在'
					}))

		else

			res.end(JSON.stringify({
				success: false,
				data: '请先登录'
			}))

	unFocusUser: (req, res) ->

		userName = req.session.user_name

		if userName

			unFocusUserName = req.body.unfocus_user_name

			database.user.findOne {user_name: userName}, (err, result) ->

				if result

					focusFriendAry = result.focus
					newFocusFriendAry = _.without(focusFriendAry, unFocusUserName)

					database.user.update {user_name: userName}, {$set: {focus: newFocusFriendAry}}, (err, result) ->

						if result

							res.end(JSON.stringify({
								success: true,
								data: '已取消关注该用户'
							}))

						else

							res.end(JSON.stringify({
								success: false,
								data: '取消关注该用户失败'
							}))

				else

					res.end(JSON.stringify({
						success: false,
						data: '用户不存在'
					}))

		else

			res.end(JSON.stringify({
				success: false,
				data: '请先登录'
			}))

	getTagAllArticle: (req, res) ->

		userName = req.session.user_name

		if userName

			articleTag = req.body.article_tag

			database.article.find {}, (err, results) ->
				
				if results

					resultAry = []

					_.each results, (articleObj) ->
						if articleTag in articleObj.article_tags
							resultAry.push(articleObj)
						null

					res.end(JSON.stringify({
						success: true,
						data: resultAry
					}))

				else

					res.end(JSON.stringify({
						success: false,
						data: '未发现任何文章'
					}))

		else

			res.end(JSON.stringify({
				success: false,
				data: '请先登录'
			}))

	removeArticle: (req, res) ->

		userName = req.session.user_name

		if userName

			articleID = req.body.article_id

			database.article.remove {_id: articleID}, {}, (err, result) ->
				
				if result

					res.end(JSON.stringify({
						success: true,
						data: '删除文章成功'
					}))

				else

					res.end(JSON.stringify({
						success: false,
						data: '未发现任何文章'
					}))

		else

			res.end(JSON.stringify({
				success: false,
				data: '请先登录'
			}))

module.exports = new Model()