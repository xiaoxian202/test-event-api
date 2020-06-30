function operateData(sql,param) {
    return new Promise((resolove,reject) => {
        //1.导入mysql包
        const mysql = require('mysql')

        //2.准备连接数据库的相关参数
        const cn = mysql.createConnection({
            //数据库所在电脑的ip或者域名
            host:'localhost',
            //数据库端口
            port:3306,
            //数据库名称
            database:'bigeventapi',
            //数据库账号
            user:'root',
            //数据库密码
            password:'111111'
        })

        //3.连接数据库
        cn.connect()

        //4.操作数据库
        cn.query(sql,param,(err,data) => {
            if (err) {
                reject(err)
            } else {
                resolove(data)
            }
        })

        //关闭数据库连接
        cn.end()
    }) 
}

module.exports ={
    operateData
}