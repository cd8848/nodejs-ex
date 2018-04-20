var fs = require('fs')
function read() {
  return new Promise((resolve,reject)=>{
    fs.readFile('test.txt', (e,d)=> {
      if (e) reject(e)
      else resolve(d)
    })
  })
}
module.exports = read;