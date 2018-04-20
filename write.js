var fs = require('fs')
function write() {
  return new Promise((resolve,reject)=>{
    fs.writeFile('test.txt', 'Hello Node.js'+new Date(), (e)=> {
      if (e) reject(e)
      else resolve('Success Write')
    })
  })
}
module.exports = write;