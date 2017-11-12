var express = require('express');
var User = require('../models/user');

var router = express.Router();

router.get('/', (req, res) => {
    var admin = new User({  //创建一个管理员
        name: 'admin',
        password: '123456',
        admin: true
    })
    admin.save((err) => {   //加入数据库，并判断是否成功
        if(err) {
            res.json({
                success: false,
                message: '管理员创建失败'
            });
        }
        res.json({
            success:true,
            message:"管理员创建成功"
        })
    })
})

module.exports = router;