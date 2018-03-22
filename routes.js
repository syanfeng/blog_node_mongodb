// 导入路由文件
var setupRoute = require('./app/routes/setup'); 
var userRoute = require('./app/routes/user');
var categoryRoute = require('./app/routes/category');
var blogRoute = require('./app/routes/blog');

module.exports = function(app) {

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
}
