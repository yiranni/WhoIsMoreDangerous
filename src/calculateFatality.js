const fs = require("fs")

let data = JSON.parse(fs.readFileSync("data/attacks.json"));

let res = [];


function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);

    const collection = map.get(key);

    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

const grouped = groupBy(data, datum => (datum.Country))

for (let [key, value] of grouped) {
    
  let obj = {};
  obj.name = key;
  obj.cases = value.length;
  let total = value.length;
  let death = 0;
  for(let i = 0; i < value.length; i++) {
      if(value[i]['Fatal (Y/N)'] === "Y") {
          death+=1
      }
  }
  obj.deaths = death;
  obj.fatality = (death/total).toFixed(2)
  res.push(obj)
}

fs.writeFileSync("data/caseSummary.json", JSON.stringify(res))
