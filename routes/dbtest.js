var db = require('./mysql.js');


/**
 * 
    let rows = query("SELECT *  from userinfo", {
      username:'admin'
    },result =>{
      console.log(result)
    });
 * 
 * 
 * @param {*} sql  sql 语句
 * @param {*} args 参数
 * @param {*} callback 回调函数
 */
function query(sql, args, callback) {
  
  if (typeof args === 'undefined') {
    sql = sql
  } else {
    if (typeof args.username != 'undefined' && typeof args.password === 'undefined') {
      sql = sql + ' where username = "' + args.username + '"'
    } else if (typeof args.username === 'undefined' && typeof args.password != 'undefined') {
      sql = sql + ' where password = "' + args.password + '"'
    } else {
      sql = sql + ' where username  = "' + args.username + '" and password = "' + args.password + '"';
    }
  } 
  db.query(sql, function (err, rows) {
    if (err) {
      console.log(err);
      return;
    }
    callback(rows[0])
  })
}

module.exports ={
  query:query
}