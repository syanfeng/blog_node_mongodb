var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');  //用来创建和确认用户信息摘要
var config = require('./config');   //读取配置文件config.js信息

var setupRoute = require('./app/routes/setup'); // 导入路由文件
var userRoute = require('./app/routes/user');
var categoryRoute = require('./app/routes/category');
var blogRoute = require('./app/routes/blog');

//一些配置
var port = process.env.PORT || '8081';  // 设置启动端口
mongoose.connect(config.database);      // 连接数据库
app.set('superSecret', config.secret);  // 设置app 的超级密码--用来生成摘要的密码

//用body parser 来解析post和url信息中的参数
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// 使用 morgan 将请求日志打印到控制台
app.use(morgan('dev'));

//路由
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");    
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, USER_NAME");    
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");    
    res.header("X-Powered-By",' 3.2.1')    
    res.header("Content-Type", "application/json;charset=utf-8");  
    if(req.method=="OPTIONS") {
        res.send(200);/*让options请求快速返回*/
    } else {
        next();
    }
});
//基础路由
app.get('/', (req, res) => {
    res.send('这里是nodejs+mongodb编写restfulAPI的笔记！');
});
app.use('/setup', setupRoute);          //设置访问路径
app.use('/user', userRoute);            //设置访问路径
app.use('/category', categoryRoute);    //设置访问路径
app.use('/blog', blogRoute);

// 启动服务
app.listen(port);
console.log('Magic happens at http://localhost:' + port);