<template>
  <div class="activity">
    <div class="title">
      <h3>Cases by country and activity</h3>
      <p>The majority of shark attacks happened in United States and Australia, while surfing is the dominant activity when sharks attack</p>
    </div>

    <div class="activity-wrapper" ref="activity_container">
      <div>
        <svg ref="usa" />
      </div>
      <div>
        <svg ref="aus" />
      </div>
    </div>
  </div>
</template>


<script>
import * as d3 from "d3";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import attackData from "~/src/data/attacks.json";

export default {
  name: "Activity",
  components: {},
  data() {
    return {
      attackData: attackData,
      nestedData: null,
      width: 0,
      height: 0
    };
  },
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap"
        },
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        }
      ]
    };
  },
  mounted() {
    this.width = this.$refs.activity_container.offsetWidth;
    this.fetchData();
    this.createLeftChart();
    this.createRightChart();
  },
  methods: {
    fetchData() {
      let data = this.attackData;
      let nestedCountry = d3
        .nest()
        .key(function(d) {
          return d.Country;
        })
        .key(function(d) {
          return d.Activity;
        })
        .entries(data);

      function calculateTotal(val) {
        let total = 0;
        val.forEach(v => {
          total += v.length;
        });
        return total;
      }

      nestedCountry.sort((a, b) =>
        d3.descending(calculateTotal(a.values), calculateTotal(b.values))
      );
      nestedCountry.forEach(d => {
        let values = d.values;
        values.sort((a, b) => d3.descending(a.values.length, b.values.length));
      });
      this.nestedData = nestedCountry;
    },
    createLeftChart() {
      let data_raw = this.nestedData;
      let data = [];
      data.push(data_raw[0]);
      const svgDom = this.$refs.usa;

      const height = this.width * 0.9;
      const width = this.width;
      const margin = { top: 80, bottom: 30, left: 0, right: 0 };

      const chartWidth = this.width / 2;
      const chartHeight = chartWidth * 0.8;
      const chartMargin = { top: 20, bottom: 48, left: 28, right: 5 };

      const svg = d3
        .select(svgDom)
        .attr("width", chartWidth)
        .attr("height", chartHeight);

      const allKeys = [];
      data.forEach(e => {
        let values = e.values;
        values.forEach(v => {
          allKeys.push(v.key);
        });
      });

      const x = d3
        .scaleBand()
        .range([chartMargin.left, chartWidth - chartMargin.bottom])
        .domain(allKeys)
        .padding(0.2);

      const y = d3
        .scaleLinear()
        .domain([0, 450])
        .range([chartHeight - chartMargin.bottom, chartMargin.top]);
      svg
        .append("text")
        .text("UNITED STATES")
        .style("fill", "black")
        .attr("x", chartWidth / 2)
        .attr("y", 18)
        .style("text-anchor", "middle")
        .attr("font-size", "18px")
        .style("font-weight", "300")
        .style("font-family", "Roboto, sans-serif");

      svg
        .append("text")
        .text("1014")
        .style("fill", "#66adca")
        .attr("x", chartWidth / 2)
        .attr("y", 48)
        .style("text-anchor", "middle")
        .attr("font-size", "24px")
        .style("font-weight", "500")
        .style("font-family", "Roboto, sans-serif");

      svg
        .append("text")
        .text("Total")
        .style("fill", "black")
        .attr("x", chartWidth / 2)
        .attr("y", 70)
        .style("text-anchor", "middle")
        .attr("font-size", "18px")
        .style("font-weight", "300")
        .style("font-family", "Roboto, sans-serif");
      svg
        .append("g")
        .call(d3.axisBottom(x).tickSize(0))
        .attr("class", "activity")
        .attr("transform", `translate(0, ${chartHeight - chartMargin.bottom})`)
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("font-family", "Roboto, sans-serif")
        .style("font-size", "12px");

      svg
        .append("g")
        .call(d3.axisLeft(y).tickSize(0))
        .attr("transform", `translate(${chartMargin.left},0)`)
        .selectAll("text")
        .style("font-family", "Roboto, sans-serif")
        .style("font-size", "12px");

      svg
        .selectAll("ausBar")
        .data(data[0].values)
        .enter()
        .append("rect")
        .attr("x", function(d) {
          return x(d.key);
        })
        .attr("y", function(d) {
          return y(d.values.length);
        })
        .attr("width", x.bandwidth())
        .attr("height", function(d) {
          return chartHeight - chartMargin.bottom - y(d.values.length);
        })
        .attr("fill", "#66adca");

      // d3.selectAll(".activity")
    },
    createRightChart() {
      let data_raw = this.nestedData;
      let data = [];
      data.push(data_raw[1]);
      const svgDom = this.$refs.aus;

      const height = this.width * 0.9;
      const width = this.width;
      const margin = { top: 80, bottom: 30, left: 0, right: 0 };

      const chartWidth = this.width / 2;
      const chartHeight = chartWidth * 0.8;
      const chartMargin = { top: 20, bottom: 48, left: 28, right: 10 };

      const svg = d3
        .select(svgDom)
        .attr("width", chartWidth)
        .attr("height", chartHeight);

      const allKeys = [];
      data.forEach(e => {
        let values = e.values;
        values.forEach(v => {
          allKeys.push(v.key);
        });
      });
      svg
        .append("text")
        .text("AUSTRALIA")
        .style("fill", "black")
        .attr("x", chartWidth / 2)
        .attr("y", 18)
        .style("text-anchor", "middle")
        .attr("font-size", "18px")
        .style("font-weight", "300")
        .style("font-family", "Roboto, sans-serif");

      svg
        .append("text")
        .text("495")
        .style("fill", "#ff6666")
        .attr("x", chartWidth / 2)
        .attr("y", 48)
        .style("text-anchor", "middle")
        .attr("font-size", "24px")
        .style("font-weight", "500")
        .style("font-family", "Roboto, sans-serif");

        svg
        .append("text")
        .text("Total")
        .style("fill", "black")
        .attr("x", chartWidth / 2)
        .attr("y", 70)
        .style("text-anchor", "middle")
        .attr("font-size", "18px")
        .style("font-weight", "300")
        .style("font-family", "Roboto, sans-serif");

      const x = d3
        .scaleBand()
        .range([chartMargin.left, chartWidth - chartMargin.bottom])
        .domain(allKeys)
        .padding(0.2);

      const y = d3
        .scaleLinear()
        .domain([0, 450])
        .range([chartHeight - chartMargin.bottom, chartMargin.top]);

      svg
        .append("g")
        .call(d3.axisBottom(x).tickSize(0))
        .attr("transform", `translate(0, ${chartHeight - chartMargin.bottom})`)
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("font-family", "Roboto, sans-serif")
        .style("font-size", "12px");

      svg
        .append("g")
        .call(d3.axisLeft(y).tickSize(0))
        .attr("transform", `translate(${chartMargin.left},0)`)
        .selectAll("text")
        .style("font-family", "Roboto, sans-serif")
        .style("font-size", "12px");

      svg
        .selectAll("ausBar")
        .data(data[0].values)
        .enter()
        .append("rect")
        .attr("x", function(d) {
          return x(d.key);
        })
        .attr("y", function(d) {
          return y(d.values.length);
        })
        .attr("width", x.bandwidth())
        .attr("height", function(d) {
          return chartHeight - chartMargin.bottom - y(d.values.length);
        })
        .attr("fill", "#ff6666");
    }
  }
};
</script>

<style scoped>
.activity .title {
  text-align: center;
  padding-top: 1em;
  padding-bottom: 0.5em;
  max-width: 600px;
  margin: 0 auto;
}

.activity .title h3 {
  font-size: 1.5rem;
  font-family: "Merriweather", serif;
  color: black;
  font-weight: 900;
}

.activity .title p {
     text-align: center;
    font-family: "Roboto", serif;
    font-size: 18px;
    font-weight: 300;
    margin-top: 1em;
    margin-bottom: 1em;
    line-height: 22px;

}

.activity-wrapper {
  /* width: 100%; */
  max-width: 800px;
  margin: 0px auto;
  display: flex;

  margin-bottom: 100px;
}


</style>
