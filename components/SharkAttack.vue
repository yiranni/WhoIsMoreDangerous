<template>
  <div>
    <!-- <p>hello</p> -->
    <svg ref="attackSummary" />
  </div>
</template>


<script>
import * as d3 from "d3";
import attackData from "~/src/data/attacks.json";
export default {
  name: "SharkAttack",
  components: {},
  data() {
    return {
      attackData: attackData,
      margin: { top: 60, right: 90, bottom: 30, left: 60 },
      width: 800,
      height: 800
    };
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      let data = this.attackData;

      let nestedActivity = d3
        .nest()
        .key(function(d) {
          return d.Activity;
        })
        .entries(data);
      nestedActivity.sort(function(x, y) {
        return d3.descending(x.values.length, y.values.length);
      });
      let wavePoints = [];

      for (let a = 0; a < nestedActivity.length; a++) {
        let obj = {};
        obj.Activity = nestedActivity[a].key;
        let cases = nestedActivity[a].values.length;
        let casesArray = [];
        casesArray.push([0, a * 80]);
        for (let i = 0; i < cases / 50; i++) {
          casesArray.push([50 * i + 25, a * 80 - 15]);
          casesArray.push([50 * i + 50, 0 + a * 80]);
        }
        obj.Cases = casesArray;
        wavePoints.push(obj);
      }

      const margin = this.margin;
      const width = this.width - margin.left - margin.right;
      const height = this.height - margin.top - margin.bottom;

      const attackSummaryDom = this.$refs.attackSummary;

      const attackSummary = d3.select(attackSummaryDom)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${width}, ${height}`)
        .attr("id", "attackSummary-responsive");

      // attackSummaryDom.style.backgroundColor = "black";

      //   const attackSummary = d3
      //     .select(attackSummaryDom)
      //     .attr("viewBox", [margin.left, margin.top, width, height])
      //     .attr("width", "100%")
      //     .attr("height", height);

      //   const lineGenerator = d3
      //     .line()
      //     .x(function(d) {
      //       return d[0];
      //     })
      //     .y(function(d) {
      //       return d[1];
      //     }).curve(d3.curveCardinal)

      //   const x = d3.scaleLinear().range([0, width]);

      //   const activity = attackSummary
      //     .selectAll(".activity")
      //     .data(wavePoints)
      //     .enter()
      //     .append("g")
      //     .attr("transform", `translate(0, ${margin.top})`);

      //   activity
      //     .append("text")
      //     .text(function(d) {
      //       return d.Activity;
      //     })
      //     .attr("text-anchor", "end")
      //     .attr("x", margin.left)
      //     .attr("y", function(d, i) {
      //       // console.log(i);
      //       return i * 80 + margin.top + 20;
      //     })
      //     .attr("font-size", "14px");

      //   activity
      //     .append("path")
      //     .attr("d", function(d) {
      //       return lineGenerator(d.Cases);
      //     })
      //     .attr("transform", `translate(${margin.left + 20}, 80)`)
      //     .attr("fill", "none")
      //     .attr("stroke", "#457b9d")
      //     .attr("stroke-width", "4px")
    }
  }
};
</script>

<style>
</style>
