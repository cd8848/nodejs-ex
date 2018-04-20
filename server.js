var http=require('http')
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

http.createServer((req, res) => {
    res.setHeader('content-type','text/plain')
    res.writeHead(200)
    res.write(JSON.stringify(Object.keys(req)).replace(/,/g,',\n'))
    res.write('\n')
    res.end(JSON.stringify(Object.keys(res)).replace(/,/g,',\n'))
  }).listen(port,ip)
  