/**
    个人中心 用户信息管理
 */
const express = require('express')
const path = require('path')
const db = require(path.join(__dirname,'../common/db.js'))
const router = express.Router()

//获取用户基本信息
router.get('/userinfo',async (req,res) => {
    //从token中获取用户的ID
    // req.user表示从token中获取的信息，该信息是登录成功后放入的
    //req.user是固定的有jwt规定
    // console.log(req.user);
    let sql = 'select id,username,nickname,email,user_pic from user where id = ?'
    let ret = await db.operateData(sql,req.user.id)
    //判断
    if (ret && ret.length > 0) {
        res.json({
            status:0,
            message:'获取用户基本信息成功！',
            data:ret[0]
        })
    } else {
        res.json({
            status:0,
            message:'获取用户基本信息失败！',
        })
    }
    
})

//更新用户基本信息
router.post('/userinfo',(req,res) => {
    res.send('update userinfo')
})

//重置密码
router.post('/updatepwd',(req,res) => {
    res.send('updatepwd')
})

//更换头像
router.post('/update/avatar',(req,res) => {
    res.send('update/avatar')
})

module.exports = router