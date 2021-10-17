const fs = require('fs')
var myArgs = process.argv.slice(2);

var file = fs.readFileSync(myArgs[0],  "utf8")
var json = `[${file.slice(0, file.length - 2)}]`
var result = JSON.parse(json)
const win_rate = ((result.filter(x=> x.total >= 30 ).length / result.length) * 100)
console.log(`Result from ${myArgs[0]}`,{sims: result.length, win_rate: win_rate});
