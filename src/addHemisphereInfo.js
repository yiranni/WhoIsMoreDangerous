const fs = require("fs")

// N - 0, S - 1
const countries = {
  'CROATIA': 0,
  'NORWAY': 0,
  'FRANCE': 0,
  'MARTINIQUE': 0,
  'ICELAND': 0,
  'JAVA': 1,
  'Sierra Leone': 0,
  'CYPRUS': 0,
  'LIBERIA': 0,
  'NEW BRITAIN': 1,
  'URUGUAY': 1,
  'NORTH ATLANTIC OCEAN ': 0,
  'ADMIRALTY ISLANDS': 1,
  'PAPUA NEW GUINEA': 1,
  'DJIBOUTI': 0,
  'TAIWAN': 1,
  'EL SALVADOR': 0,
  'ST. MAARTIN': 0,
  'NAMIBIA': 1,
  'OCEAN': 1,
  'CAPE VERDE': 0,
  'MID ATLANTIC OCEAN': 0,
  'MAURITIUS': 1,
  'ANTIGUA': 0,
  'FRENCH POLYNESIA': 1,
  'JOHNSTON ISLAND': 0,
  'SUDAN': 0,
  'SOUTH KOREA': 0,
  'TUVALU': 1,
  'SOUTH ATLANTIC OCEAN': 1,
  'UNITED ARAB EMIRATES (UAE)': 0,
  'DOMINICAN REPUBLIC': 0,
  ' PHILIPPINES': 0,
  'MALAYSIA': 0,
  'BRITISH VIRGIN ISLANDS': 0,
  'CHINA': 0,
  'ATLANTIC OCEAN': 0,
  'ITALY': 0,
  'VENEZUELA': 0,
  'SOLOMON ISLANDS / VANUATU': 1,
  'SOUTH CHINA SEA': 0,
  'Between PORTUGAL & INDIA': 2,
  'DIEGO GARCIA': 1,
  'MEDITERRANEAN SEA?': 0,
  'INDIAN OCEAN?': 1,
  'INDIA': 0,
  'SOUTH AFRICA': 1,
  'ST HELENA': 1,
  'WESTERN SAMOA': 1,
  'TASMAN SEA': 1,
  'HONG KONG': 0,
  'TONGA': 1,
  'YEMEN': 0,
  'COLUMBIA': 0,
  'NORTHERN MARIANA ISLANDS': 0,
  'GUAM': 0,
  'GUINEA': 0,
  'CENTRAL PACIFIC': 2,
  'GUATEMALA': 0,
  'FIJI': 1,
  'GULF OF ADEN': 0,
  'JAPAN': 0,
  'MID-PACIFC OCEAN': 0,
  'ST. MARTIN': 1,
  'UNITED STATES': 0,
  'CRETE': 0,
  'BRAZIL': 1,
  'TURKS & CAICOS': 0,
  'SOUTHWEST PACIFIC OCEAN': 1,
  'GREENLAND': 0,
  'BAY OF BENGAL': 1,
  'PACIFIC OCEAN': 0,
  'LEBANON': 0,
  'MALTA': 0,
  'NIGERIA': 0,
  'GREECE': 0,
  'MEXICO': 0,
  'BERMUDA': 0,
  'UNITED KINGDOM': 0,
  'SINGAPORE': 0,
  'BRITISH ISLES': 0,
  'TURKEY': 0,
  'NEVIS': 1,
  'AUSTRALIA': 1,
  'ENGLAND': 0,
  'SIERRA LEONE': 0,
  'VANUATU': 1,
  'NORTH SEA': 0,
  'RUSSIA': 0,
  'MICRONESIA': 0,
  'PORTUGAL': 0,
  'RED SEA': 0,
  'MONTENEGRO': 0,
  'IRAQ': 0,
  'SWEDEN': 0,
  'PERSIAN GULF': 0,
  'NORTH ATLANTIC OCEAN': 0,
  'Fiji': 1,
  'SLOVENIA': 0,
  'PHILIPPINES': 0,
  'IRAN / IRAQ': 0,
  'TUNISIA': 0,
  'SAN DOMINGO': 1,
  'AZORES': 0,
  'GEORGIA': 0,
  'BURMA': 0,
  'NEW GUINEA': 1,
  'SUDAN?': 0,
  'NETHERLANDS ANTILLES': 0,
  'ALGERIA': 0,
  'NICARAGUA': 0,
  'SEYCHELLES': 1,
  'RED SEA?': 0,
  'BRITISH NEW GUINEA': 1,
  'THAILAND': 0,
  'PALESTINIAN TERRITORIES': 0,
  'FALKLAND ISLANDS': 1,
  'IRELAND': 0,
  'MONACO': 0,
  'PARAGUAY': 1,
  'SYRIA': 0,
  'EGYPT ': 0,
  'MADAGASCAR': 1,
  'NORTH PACIFIC OCEAN': 0,
  'EGYPT / ISRAEL': 0,
  'COOK ISLANDS': 1,
  'TRINIDAD & TOBAGO': 0,
  'PACIFIC OCEAN ': 0,
  'EQUATORIAL GUINEA / CAMEROON': 0,
  'ISRAEL': 0,
  'SAMOA': 1,
  'ECUADOR': 1,
  'CARIBBEAN SEA': 0,
  'NEW CALEDONIA': 1,
  'MARSHALL ISLANDS': 0,
  'PANAMA': 0,
  'UNITED ARAB EMIRATES': 0,
  'ITALY / CROATIA': 0,
  'NEW ZEALAND': 1,
  'MALDIVES': 0,
  'GHANA': 0,
  'MOZAMBIQUE': 0,
  'SRI LANKA': 0,
  'SOLOMON ISLANDS': 1,
  'Coast of AFRICA': 1,
  'BARBADOS': 0,
  'BANGLADESH': 0,
  'CHILE': 1,
  'CANADA': 0,
  'HONDURAS': 0,
  'PALAU': 0,
  'AMERICAN SAMOA': 1,
  'SAUDI ARABIA': 0,
  'TONGA': 1,
  'SPAIN': 0,
  'ARGENTINA': 1,
  'CURACAO': 0,
  'ANDAMAN / NICOBAR ISLANDAS': 0,
  'KENYA': 1,
  'EGYPT': 0,
  'THE BALKANS': 0,
  'PUERTO RICO': 0,
  'KIRIBATI': 0,
  'OKINAWA': 0,
  'REUNION': 1,
  'BRITISH WEST INDIES': 0,
  'NICARAGUA ': 0,
  'FEDERATED STATES OF MICRONESIA': 0,
  'IRAN': 0,
  'CAYMAN ISLANDS': 0,
  'SOMALIA': 0,
  'INDONESIA': 1,
  'KUWAIT': 0,
  'Seychelles': 1,
  'COSTA RICA': 0,
  'INDIAN OCEAN': 1,
  'CEYLON (SRI LANKA)': 0,
  'YEMEN ': 0,
  'HAITI': 0,
  'SCOTLAND': 0,
  'CUBA': 0,
  'GUYANA': 0,
  'LIBYA': 0,
  'MEXICO ': 0,
  'SENEGAL': 0,
  'GRAND CAYMAN': 0,
  'GABON': 1,
  'GRENADA': 0,
  'RED SEA / INDIAN OCEAN': 0,
  'VIETNAM': 0,
  'BAHAMAS': 0,
  'BAHREIN': 0,
  'NORTHERN ARABIAN SEA': 0,
  'BELIZE': 0,
  'MEDITERRANEAN SEA': 0,
  'ANGOLA': 1,
  'SOUTH PACIFIC OCEAN': 1,
  'TANZANIA': 1,
  'KOREA': 0,
  'JAMAICA': 0,
  'ARUBA': 0,
  'MAYOTTE': 1,
  "COMOROS": 1
}

const attack_data = JSON.parse(fs.readFileSync("data/attacks.json"))

let data_with_hemisphere = [];

attack_data.forEach(a => {
  let obj = {};
  obj.Date = a.Date;
  obj.Year = a.Year;
  let Country = a.Country
  obj.Country = Country;
  let Fatal;
  if (a['Fatal (Y/N)'] === "Y") {
    Fatal = true;
  } else {
    Fatal = false;
  }
  obj.Fatal = Fatal;
  let Hemisphere;
  if (Country in countries) {
    Hemisphere = countries[Country]
  } else {
    Hemisphere = 2
  }
  obj.Hemisphere = Hemisphere;
  data_with_hemisphere.push(obj)

})

let hemishpere_sum = [];

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

const grouped_by_year = groupBy(data_with_hemisphere, datum => (datum.Year))

for (let [key, value] of grouped_by_year) {


  let obj = {};
  obj.year = key;
  let cases = [{
      "sphere": "North",
      "total": 0,
      "death": 0
    },
    {
      "sphere": "South",
      "total": 0,
      "death": 0
    }
  ];
  for(let i = 0; i < value.length; i++) {
      if(value[i].Hemisphere === 0) {
          cases[0].total+=1
          if(value[i].Fatal === true) {
            cases[0].death +=1
          }
      }else {
          cases[1].total += 1;
          if(value[i].Fatal === true) {
              cases[1].death += 1
          }
      }
  }
  obj.cases = cases;
  hemishpere_sum.push(obj)
}

hemishpere_sum.sort(function(a,b) {
    return parseInt(a.year) - parseInt(b.year)
})


// console.log(hemishpere_sum)


fs.writeFileSync("data/hemisphere_sum.json", JSON.stringify(hemishpere_sum))
