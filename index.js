const express = require('express')
const cors = require('cors')
const path = require('path')
//解析token 安装依赖
const jwt = require('express-jwt')
const loginRouter = require(path.join(__dirname,'/routers/login.js'))
const userRouter = require(path.join(__dirname,'/routers/user.js'))

//创建express服务器
const app = express()

// 处理客户端请求post参数
// for parsing application/json
app.use(express.json()) 
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) 

// 解析token
// secret需要跟加密的唯一标识保持一致
// unless的作用：排除一些路径不需要进行token解析
app.use(jwt({secret:'bigevent'}).unless({path:/^\/api/}))

//设置路由
app.use('/api',loginRouter)
app.use('/my',userRouter)

//设置跨域
app.use(cors())

//监听客户端端口
app.listen(8888,() => {
    console.log('running...');
})

