var express = require('express');
var router = express.Router();
var path = require('path');
//引入插件
var vertoken = require('../token/token')
var expressJwt = require('express-jwt')

//解析token获取用户信息
router.use(function (req, res, next) {
  var token = req.headers['authorization'];
  if (token == undefined) {
    return next();
  } else {
    vertoken.getToken(token).then((data) => {
      req.data = data;
      return next();
    }).catch((error) => {
      return next();
    })
  }
});

//验证token是否过期并规定那些路由不需要验证
router.use(expressJwt({
  secret: 'zgs_first_token',
  algorithms: ['HS256']
}).unless({
  path: ['/', '/login'] //不需要验证的接口名称
}))
//设置托管静态目录; 项目根目录+ public.可直接访问public文件下的文件eg:http://localhost:3000/images/url.jpg
router.use(express.static(path.join(__dirname, 'public')));
// router.use('/', indexRouter);
// router.use('/', usersRouter);

//token失效返回信息
router.use(function (err, req, res, next) {
  if (err.status == 401) {
    return res.status(401).send('token失效')
    //可以设置返回json 形式  res.json({message:'token失效'})
  }
})
module.exports = router;