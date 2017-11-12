var express = require('express');
var Category = require('../models/category');
var router = express.Router();

// 添加分类
router.post('/add', (req, res) => {
    var title = req.body.title;
    var category = new Category({
        title: title
    })
    category.save((err) => {
        if(err) {
            res.json({
                success: false,
                message: '添加分类成功！'
            })
        }
    })
    res.json({
        success: true,
        message: '添加分类成功！'
    })
})

// 查看所有分类
router.get('/getAll', (req, res) => {
    Category.find({}, (err, categories) => {
        res.json({
            success: true,
            data: categories
        })
    })
})

// 更新分类
router.put('/update', (req, res) => {
    // 解构赋值
    console.log(req.body);
    var {title, newTitle} = req.body;
    Category.findOneAndUpdate({title: title}, {title: newTitle}, (err, category) => {
        if(err) {
            res.json({
                success: false,
                message: '更新分类失败'
            })
        }
    })
    res.json({
        success: true,
        message: '更新分类成功！'
    })
})

// 删除分类
router.delete('/delete', (req, res) => {
    console.log('delete category');

    // 解构赋值
    var {title} = req.body;
    Category.remove({title: title}, (err) => {
        if(err) {
            res.json({
                success: false,
                message: '删除分类成功！'
            })
        }
    })
    res.json({
        success: true,
        message: '删除分类成功！'
    })
})

module.exports = router;
