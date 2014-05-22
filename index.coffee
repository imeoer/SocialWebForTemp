express = require('express')
consolidate = require('consolidate')
model = require('./model')

app = express()
app.use(express.json())
app.use(express.multipart({uploadDir: './public/data'}))
app.use(express.urlencoded())
app.use(express.cookieParser())
app.use(express.cookieSession({secret: 'social_web'}))

app.use(express.static(__dirname + '/public'))
app.engine('html', consolidate.handlebars)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

app.get '/', model.indexPage #主页
app.get '/login', model.loginPage #登录页
app.get '/upload', model.uploadPage #上传页

app.post '/login', model.login #登录
app.post '/register', model.register #注册
app.post '/getUserInfo', model.getUserInfo #获取当前用户信息
app.post '/updateUserInfo', model.updateUserInfo #更新当前用户信息
app.post '/sendPrivateMessage', model.sendPrivateMessage #向指定用户发送私信
app.post '/markAllMsgHaveRead', model.markAllMsgHaveRead #标记当前用户收到的所有私信为已读

app.post '/publish', model.publish #发布文章
app.post '/listMyArticle', model.listMyArticle #获取当前用户文章
app.post '/listAllArticle', model.listAllArticle #获取所有用户文章
app.post '/listUserArticle', model.listUserArticle #获取指定用户文章
app.post '/addArticleComment', model.addArticleComment #评论指定文章
app.post '/forwardArticle', model.forwardArticle #转发指定文章

app.post '/focusUser', model.focusUser
app.post '/unFocusUser', model.unFocusUser

app.listen(80)