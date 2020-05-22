const csvToJson = require('csv-parser');
const fs = require("fs")

let results = []
let activities = ["Surfing", "Swimming", "Fishing", "Wading", "Snorkeling", "Diving", "Boarding"]
fs.createReadStream('data/attacks.csv')
  .pipe(csvToJson())
  .on('data', (data) => {
    if (parseInt(data.Year) >= 2000) {
      //   let activity = data.Activity;
      //   let obj = {};
      //   obj.Date = data.Date;
      //   obj.Year = data.Year;
      //   obj.Type = data.Type;
      //   obj.Country = data.Country;
      //   obj.Area = data.Area;
      //   obj.Location = data.Location;
      let activity;
      //   for (let i = 0; i < activities.length; i++) {
      if (data.Activity.toLowerCase().includes("swimming")) {
        activity = "Swimming"
      } else if (data.Activity.toLowerCase().includes("surfing")) {
        activity = "Surfing"
      } else if (data.Activity.toLowerCase().includes("fishing")) {
        // console.log(data.Activity + ": " + activities[i])
        activity = "Fishing"
      } else if (data.Activity.toLowerCase().includes("wading")) {
        // console.log(data.Activity + ": " + activities[i])
        activity = "Wading"
      } else if (data.Activity.toLowerCase().includes("snorkeling")) {
        // console.log(data.Activity + ": " + activities[i])
        activity = "Snorkeling"
      } else if (data.Activity.toLowerCase().includes("diving")) {
        // console.log(data.Activity + ": " + activities[i])
        activity = "Diving"
      } else if (data.Activity.toLowerCase().includes("boarding")) {
        // console.log(data.Activity + ": " + activities[i])
        activity = "Boarding"
      } else {
        //   console.log(data)
        //   data.Activity = "Other"
        activity = "Other"
      }

      data.Activity = activity

      results.push(data)
    }

  })
  .on('end', () => {
    console.log(results)
    fs.writeFileSync("data/attacks.json", JSON.stringify(results))
  });

// fs.writeFileSync("data/attacks.json", JSON.stringify(outputjson))
