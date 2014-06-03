SocialWebForTemp
================

安装Node.js

在CMD执行：npm install coffee-script -g

CD到源码目录下执行：coffee index.coffee

目录结构说明
================

    db - 数据库存放目录
        user.db - 用户数据
    	article.db - 文章数据
    node_modules - 第三方库存放目录
    	connect-multiparty - 用于辅助文件上传
    	consolidate - 辅助渲染前端页面
    	express - Web服务器（整个后台所用的框架）
    	handlebars - 模板引擎，用于渲染页面
    	nedb - NoSQL数据库
    	underscore - 包含一些常用操作的库
    public - 前端文件存放目录
    	css - CSS样式
    	data - 前端上传的图片存放目录
    	images - 前端界面所用图片
    	js - 前端JS脚本
    views - 视图（页面）文件目录，由后端渲染后返回给前端显示
    	index.html - 主页
    	login.html - 登录页
    database.coffee - 用于数据库操作
    index.coffee - 用于后台的入口
    model.coffee - 用于请求处理

问题说明
================

	为什么使用JavaScript来开发Web后台？

	JavaScript在以前主要用于网页前端开发，现在新兴的Node.js平台用Google的V8引擎把JavaScript跑在了服务端，JavaScript语言上的单线程，异步特性，以及Node将磁盘IO，网络请求等耗时操作使用异步回调的方式执行，再加上V8引擎本身优秀的性能，Node的运行速度非常快，很适合频繁请求，小量数据的Web应用（比如这个社交平台）
	使用Node，将前后台开发统一为JavaScript语言，前后端对接更容易，数据处理更加统一。
	后台使用和MongoDB接口风格一致的轻量NoSQL数据库NeDB，该数据库使用JSON格式进行存储，所以用JavaScript调用更方便，且由于NoSQL的特性，数据库结构，字段很容易更改，对开发和后期更新维护更方便。

	简单说一下后台请求路由到处理返回给前端的过程？

	1、前端将要发送的数据封装成JSON格式，以AJAX的方式请求后台
	2、后台Server根据请求的URL和请求类型（GET,POST），将请求交给不同的处理函数来处理
	3、处理函数从请求体中获取前端发送来的数据，验证是否合法后，写入数据到数据库，或从数据库更新，删除数据
	4、后端处理完毕后，将操作的结果以JSON的格式返回给前端，前端解析该JSON格式，然后操作DOM显示出结果

数据库中字段说明
================

	user.db包含字段：
		user_name（用户名）
		pass_word（密码）
		msgs（私信，数组：对方用户名，私信内容，是否已读，发送的时间）
		focus（关注的人，数组）
		user_nick（昵称）
		user_motto（个人格言）
		_id（唯一键）

	article.db包含字段：
		user_name（所属用户）
		article_title（标题）
		article_content（内容）
		article_tags（标签）
		article_image（图片）
		article_url（链接）
		article_comments（评论，数组）
		publish_date（发表日期）
		_id（唯一键） 