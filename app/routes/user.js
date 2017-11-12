var express = require('express');
var app = express();
var User = require('../models/user');

var jwt = require('jsonwebtoken');
var config = require('../../config');
app.set('superSecret', config.secret);

var router = express.Router();

router.post('/login', (req, res) => {
    User.findOne({
        name: req.body.name     //根据用户输入用户名进行匹配
    }, (err, user) => {         //登录验证
        if(err) {
            res.json({
                success: false,
                message: '登录失败'
            });
        }
        if(!user) {
            res.json({
                success: false,
                message: '认证失败，用户名找不到'
            });
        } else if(user) {
            if(user.password != req.body.password) {
                res.json({
                    success: false,
                    message: '认证失败，密码错误'
                });
            } else {
                var token = jwt.sign({name: 'foo'}, app.get('superSecret'));    //获取token
                res.json({
                    success: true,
                    message: '恭喜，登录成功',
                    token: token
                })
            }
        }
    })
})

router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if(err) {
            res.json({
                success: false,
                message: '查询用户列表失败'
            })
        }
        res.json({
            success: true,
            message: '查询用户列表成功',
            data: users
        })
    })
})

module.exports = router;