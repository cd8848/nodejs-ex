var http = require('http')
var https = require('https')
var fs = require('fs')
function swchk() {
  return new Promise((resolve,reject)=>{
    Promise.all(pa)
    .then( (arr)=>{
      if (chg) fs.writeFileSync(swver,JSON.stringify(va))
      resolve(arr.join('<br>'))
    }).catch((e)=>{
      reject(e)
    })
  })
}
var vd = [
["Nodejs", "https://nodejs.org/en/", /Download v?([0-9.]+)/],
["Nginx", "http://nginx.org/", />nginx-([0-9.]+)</],
["PHP", "http://php.net/downloads.php", /PHP ([0-9]+\.[0-9]+\.[0-9]+)/],
["TDM-GCC", "http://tdm-gcc.tdragon.net/", />GCC ([0-9.]+)/],
["AkelPad", "http://akelpad.sourceforge.net/en/download.php", /<b>([0-9.]+)/],
["Upx", "https://upx.github.io/", /UPX ([0-9.]+) /],
["Lua", "https://www.lua.org/", />Lua ([0-9.]+)</],
["LuaJit", "http://luajit.org/download.html", /LuaJIT-([0-9.]+)/],
["Python", "https://www.python.org/downloads/", /Download Python ([0-9.]+)/],
["FreeBasic", "https://sourceforge.net/projects/fbc/files/", /Windows\/FreeBASIC-([0-9.]+)-win/],
["FreePascal", "https://freepascal.org/", /Version <em>([0-9.]+)/],
["Scite", "https://www.scintilla.org/SciTEDownload.html", /Release ([0-9.]+)/],
["FASM", "http://flatassembler.net/download.php", /assembler ([0-9.]+) for/],
["TotalCmd", "http://www.ghisler.com/whatsnew.htm", /Total Commander ([0-9.]+\w*) /],
["TakeCommand", "https://jpsoft.com/all-downloads/downloads.html", />(\d\d\.\d\d\ Build[^<]+)/]
]

function chkVer(name,url,re) {
  return new Promise((resolve,reject)=> {
    //console.log(`[${name}] : ${url}`);
    let ptc = /^https?/.exec(url)[0]
    //console.log(ptc);
    ptc = ptc == 'http' ? http : https;
    ptc.get(url,(res)=>{
      let h = ''
      res.on('data',(d)=>{
        h+=d
      })
      res.on('end',()=>{
        let m = re.exec(h)
        if(m) {
          m = m[1]
          if( va[name] != m ) {
            va[name] = m
            chg = true
            m += ' New!'
          }
        } else m = 'Error'
        resolve( name +': '+ m )
      })
      res.on('error',(e)=> {
        reject(e)
      })
    })
  })
}

var chg = false
var swver = 'swver.json'
var va = {}
if( fs.existsSync(swver) ) va = JSON.parse(fs.readFileSync(swver))
var pa = vd.map( (e)=> {
  return chkVer(e[0],e[1],e[2])
})

module.exports = swchk;