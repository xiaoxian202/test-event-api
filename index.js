const express = require('express')
const cors = require('cors')
const path = require('path')
const loginRouter = require(path.join(__dirname,'/routers/login.js'))

//创建express服务器
const app = express()

// 处理客户端请求post参数
// for parsing application/json
app.use(express.json()) 
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) 

//设置路由
app.use('/api',loginRouter)

//设置跨域
app.use(cors())

//监听客户端端口
app.listen(8888,() => {
    console.log('running...');
})

