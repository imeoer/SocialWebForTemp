express = require('express')
consolidate = require('consolidate')
model = require('./model')

app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(express.cookieParser())
app.use(express.cookieSession({secret: 'social_web'}))

app.use(express.static(__dirname + '/public'))
app.engine('html', consolidate.handlebars)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

app.get '/', model.index
app.post '/login', model.login
app.post '/register', model.register

app.listen(80)