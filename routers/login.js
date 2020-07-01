/**
    统一管理路由信息
 */
const express = require('express')
const path = require('path')
//导入加密包 安装依赖
const utils = require('utility')
//token的生成规范 安装依赖包
const jwt = require('jsonwebtoken')
const db = require(path.join(__dirname,'../common/db.js'))
const router = express.Router()

//登录
router.post('/login',async (req,res) => {
    //获取前端传递过来的参数
    let param = req.body
    //加密
    param.password = utils.md5(req.body.password)
    //根据用户名和密码查询数据库
    let sql = 'select id from user where username = ? and password = ?'
    let ret = await db.operateData(sql,[param.username,param.password])
    //判断
    if (ret && ret.length > 0) {
        //如果登录验证通过，就生成该用户的token信息
        // jwt.sign方法参数的说明
        //参数一：表示添加到token中的用户信息
        //参数二：表示加密唯一标识（加密的干扰字符串）
        //参数三：表示加密配置选项（可以设置token的有效期)
        // jwt规定在token字符串之前添加一个Bearer 特殊标识
        let token = jwt.sign(
            {username:param.username,id:ret[0].id},
            'bigevent',
            {expiresIn:'1h'})
        res.json({
            status:0,
            message:'登陆成功',
            token:'Bearer ' + token
        })
    } else {
        res.json({
            status:1,
            message:'登陆失败'
        })
    }
})

// 注册
router.post('/reguser',async (req,res) => {
    //获取前端传递过来的参数
    let param = req.body
    // 加密 md5是单向加密，不能从密文返解为明文
    param.password = utils.md5(req.body.password)
    //调用数据库相关方法进行数据添加操作
    let sql = 'insert into user set ?'
    let ret = await db.operateData(sql,param)
    //判断
    if (ret && ret.affectedRows > 0) {
        res.json({
            status:0,
            message:'注册成功'
        })
    } else {
        res.json({
            status:1,
            message:'注册失败'
        })
    }
})
router.get('/data',async (req,res) => {
    let sql = 'select * from user'
    let ret = await db.operateData(sql,null)
    res.json({
        status:0,
        data:ret
    })
})

module.exports = router