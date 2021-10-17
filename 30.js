const fs = require('fs')
var myArgs = process.argv.slice(2);

console.log("Starting");
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  
function roll(dices) {
    rolls = []
    for (let i = 0; i < dices; i++) {
        rolls = [...rolls, randomIntFromInterval(1, 6)]
    }
    return rolls
}

var games = []
var rollsToKeep = [...myArgs.map(x=> parseInt(x))]
const alwaysTakeWin = true
var n = 0
while (true) {

    var resultDices = []


    for (let i = 0; i < 6;) {
        var rolls = roll(6 - (i))
        
        const filterKeep = rolls.filter(x=> rollsToKeep.includes(x))
        const combined = ([...resultDices, ...rolls])
        if (filterKeep.length > 0) {
            resultDices = [...resultDices, ...filterKeep]
            filterKeep.map(x=> i++)
        }else if (combined.reduce((a,b)=> a + b) >= 30 && alwaysTakeWin) {
            resultDices = combined
            combined.map(x=> i++)
        } else {
            resultDices = [...resultDices, rolls.sort((a,b) => a - b).reverse()[0]]
            i++;
        }        
    }
    result = { rolls: resultDices, total: resultDices.reduce((a,b) => a + b)}
    //console.log("Game completed", result);
    games = [...games, result]
    if (games.length > 10000) {
        const json = JSON.stringify(games)
        fs.appendFileSync(`sims-keep_${rollsToKeep.join('&')}_${alwaysTakeWin ? 'alwaysTakeWin' : ''}.json`, json.slice(1, json.length - 1) + ',\n')
        games = []
    }
    n++
    console.log(n);
}



