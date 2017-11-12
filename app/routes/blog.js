var express = require('express');
var Blog = require('../models/blog');

var router = express.Router();

// 显示所有博客
router.get('/', (req, res) => {
    // 根据分类查找
    var {category} = req.body;
    var whereObj = {};
    if(category) {
        var reg = new RegExp('^' + category + '$');
        whereObj = {category: reg};
    }
    Blog.find(whereObj, (err, blogs) => {
        res.json({
            success: true,
            data: blogs
        })
    })
})

// 发布博客
router.post('/', (req, res) => {
    // 结构赋值
    var {title, body, author, tags, hidden, category} = req.body;
    console.log(title);
    if(title.length < 3) {
        req.json({
            success: false,
            message: '标题长度不能小于3'
        })
    }
    // 标签格式应该是对象数组
    // 把标签分割成数组格式
    var tagsArray = tags.split(',');
    // 新建一个空数组，用来放对象
    var tagsObjArray = [];
    // 通过遍历的方式，把标签内容放入对象里面，通过push方式
    tagsArray.forEach((item) => {
        tagsObjArray.push({title: item});
    });
    var blog = new Blog({
        title,
        body,
        author,
        tags: tagsObjArray,
        hidden,
        category
    });
    blog.save((err) => {
        if(err) {
            res.json({
                success: false,
                message: '博客发布失败'
            });
        }
        res.json({
            success: true,
            message: '博客发布成功'
        })
    })
})

// 修改博客
router.put('/', (req, res) => {
    var {title, newTitle, body, newBody, author, newAuthor} = req.body;
    if(newTitle.length < 3) {
        res.json({
            success: false,
            message: '标题长度不能小于3'
        })
    }
    Blog.update({
        title:title,
        // body: body,
        // author: author
    }, {
        title: newTitle,
        body: newBody,
        // author: newAuthor
    }, (err, blog) => {
        if(err) {
            res.json({
                success: false,
                message: '更新博客失败'
            })
        }
    });
    res.json({
        success: true,
        message: '更新博客成功'
    })
})

// 删除博客
router.delete('/', (req, res) => {
    var {title} = req.body;
    Blog.remove({title: title}, (err) => {
        if(err) {
            res.json({
                success: false,
                message: '删除博客失败！'
            })
        }
    })
    res.json({
        success: true,
        message: '删除博客成功！'
    })
})

module.exports = router;