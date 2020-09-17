var express = require('express');
const ab = require('./dbtest')
var vertoken = require('../token/token')
const {
  route
} = require('./users');
var router = express.Router();


// 设置允许跨域访问该服务。

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'X-Requested-Width,Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  if (req.method === "OPTIONS") {
    res.send(200)
  } else {
    next();
  }
})

router.post('/pulick/login', function (req, res, next) {  // 查询用户是否存在 操作mysql
  const {
    username,
    password
  } = req.body.params
  // userinfo 表
  ab.query("SELECT *  from userinfo", {
    username,
    password
  }, result => {
    if (typeof result === 'undefined') {
      res.json({
        status: 1,
        msg: '账号或者密码错误'
      })
    }
    vertoken.setToken(result.username, result.id).then(token => {
      res.json({
        status: 0,
        uid: result.id,
        username: result.username,
        level: result.level,
        token: token
        //前端获取token后存储在localStroage中,
        //**调用接口时 设置axios(ajax)请求头Authorization的格式为token
      })
    })
  })
})
router.post('/pulick/checkToken', function (req, res, next) {  //服务器端判断前端传过来的token是否合法
  vertoken.getToken(req.headers.authorization).then(data => {
      res.json({
        status:0,
        msg:'success'
      })
  }).catch(e => {
      res.json({
        status:1,
        msg:'success'
      })
  })

  // headers:->rawHeaders:
})
module.exports = router;