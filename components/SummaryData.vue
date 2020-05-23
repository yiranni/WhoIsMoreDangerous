<template>
  <div>
    <div class="summary-data">
      <div style="border-style: none solid none none; border-width: 1px; border-color: gray; padding-right: 25px">
        <h1 style="color: #d00000">{{addCommas(this.totalCase)}}</h1>
        <p>Total confirmed cases</p>
      </div>
      <div style="padding-left: 25px">
        <h1>{{addCommas(this.totalDeath)}}</h1>
        <p>Deaths</p>
      </div>
    </div>
  </div>
</template>

<script scoped>
import attackData from "~/src/data/attacks.json";
export default {
  name: "SummayData",
  data() {
    return {
      attackData: attackData,
      totalCase: 0,
      totalDeath: 0
    };
  },
  head() {
      return {
        link: [
          {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap'},
          {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'}
        ]
      }
    },
  mounted() {
    
    this.fetchData();
  },
  methods: {
    fetchData() {
      let data = attackData;
      this.totalCase = attackData.length;

      let totalDeath = 0;

      for (let i = 0; i < data.length; i++) {
        if (data[i]["Fatal (Y/N)"] === "Y") {
          totalDeath += 1;
        }
      }

      this.totalDeath = totalDeath;
    },
    addCommas(nStr) {
      nStr += "";
      var x = nStr.split(".");
      var x1 = x[0];
      var x2 = x.length > 1 ? "." + x[1] : "";
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
      }
      return x1 + x2;
    }
  }
};
</script>

<style>

.summary-data {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  /* padding-left: 10vw;
  padding-right: 10vw; */
  /* width: ; */
}

.summary-data > div {
  /* width: 50%; */
  text-align: center;
  /* margin-left: 50px;
  padding-right: 50px; */
  height: 100px;
  /* width: 500px; */
}


.summary-data h1 {
  font-family: "Roboto", sans-serif;
  font-size: 3.5em;
  font-weight: 900;
}
.summary-data p {
  font-family: "Roboto", sans-serif;
  font-size: 0.9em;
  color: gray;
}
</style>
