const fs = require("fs")

const data = JSON.parse(fs.readFileSync("data/attacks.json"))

let res = [];
data.forEach(d => {

    if(d.Sex.length != 0 && Number.isNaN(parseInt(d.Age)) === false ) {
        res.push(d)
    }
})
res.forEach(r => {
//    if(Number.isNaN(parseInt("8 or 10"))=== true) {
       console.log(parseInt("8 or 10"))
//    }
})

console.log(res.length)
// fs.writeFileSync("data/attacks_with_age_sex.json", JSON.stringify(res))