var http = require('http')
var https = require('https')
var fs = require('fs')

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

http.createServer((req, res) => {
  let para = ( req.url.slice(1) || 'index' ).split('/')
  var fn = require('./'+para[0])
  res.setHeader('content-type','text/html;charset=utf-8')
  res.writeHead(200)
  fn(para.slice(1))
  .then((d)=> {
    res.end(d)
  }).catch((e)=>{
    res.end(String(e))
  })
}).listen(port,ip)
console.log(`listening on ${ip}:${port}`)
  
