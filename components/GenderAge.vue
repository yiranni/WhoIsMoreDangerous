<template>
  <div class="gender">
    <div class="title">
      <h3>Cases by gender and age</h3>
    </div>
    <div class="gender-wrapper" ref="gender_container">
      <svg ref="gender" />
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import attacks from "~/src/data/attacks_with_age_sex.json";
export default {
  name: "Gender",
  data() {
    return {
      attacks: attacks,
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
    this.width = this.$refs.gender_container.offsetWidth;
    this.createChart();
  },
  methods: {
    createChart() {
      const data = this.attacks;

      data.forEach(d => {
        d.Age = +d.Age;
      });

      // group by sex -> age
      const nestedSex = d3
        .nest()
        .key(function(d) {
          return d.Sex;
        })
        .key(function(d) {
          return +d.Age;
        })
        .entries(data);

      // sort by age
      let sortedAge = [];
      nestedSex.forEach(e => {
        let obj = {};
        obj.key = e.key;

        let sorted = e.values
          .slice()
          .sort((a, b) => d3.descending(parseInt(a.key), parseInt(b.key)));

        obj.values = sorted;
        sortedAge.push(obj);
      });

      sortedAge.forEach(e => {
        let values = e.values;
        values.forEach(v => {
          v.key = parseInt(v.key);
        });
      });

      const svgDom = this.$refs.gender;

      const height = this.width * 2;
      const width = this.width;

      const margin = { top: 80, bottom: 30, left: 0, right: 0 };
      const svg = d3
        .select(svgDom)
        .attr("width", "100%")
        .attr("height", height);

      const y = d3
        .scaleLinear()
        .domain([
          d3.min(data, function(d) {
            return d.Age;
          }),
          d3.max(data, function(d) {
            return d.Age;
          })
        ])
        .range([height - margin.bottom, margin.top]);

      const xRight = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(sortedAge, function(d) {
            return d3.max(d.values, function(v) {
              return v.values.length;
            });
          })
        ])
        .range([width / 2 + 20, width - margin.right]);

      const xLeft = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(sortedAge, function(d) {
            return d3.max(d.values, function(v) {
              return v.values.length;
            });
          })
        ])
        .range([width / 2 - 20, margin.left]);

      const label = svg.append("g");
      label
        .append("text")
        .text("Age")
        .style("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", 60)
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .style("font-family", "Roboto, sans-serif");

      // y axis
      svg
        .append("g")
        .attr("id", "age")
        .call(
          d3
            .axisLeft(y)
            .ticks(86)
            .tickSize(0)
            .tickPadding(0)
        )
        .attr("transform", `translate(${width / 2}, 0)`);

      //   svg
      //     .append("g")
      //     .call(d3.axisTop(xRight))
      //     .attr("transform", `translate(0, ${margin.top})`);

      d3.selectAll(".tick>line").remove();

      d3.selectAll(".tick>text")
        .attr("font-size", "14px")
        .style("text-anchor", "middle");

      // add background color to tick text
      d3.selectAll("#age>.tick").each(function(d, i) {
        var tick = d3.select(this),
          text = tick.select("text"),
          bBox = text.node().getBBox();

        tick
          .insert("rect", ":first-child")
          .attr("x", bBox.x - 3)
          .attr("y", bBox.y - 3)
          .attr("height", bBox.height + 6)
          .attr("width", bBox.width + 6)
          .style("fill", "white");
      });

      let data_with_idx = [];

      sortedAge.forEach(d => {
        let allAges = d.values;
        allAges.forEach(a => {
          let cases = a.values;
          for (let i = 0; i < cases.length; i++) {
            let obj = cases[i];
            obj.idx = i;
            data_with_idx.push(obj);
          }
        });
      });

      let data_with_idx_sorted = data_with_idx.slice().sort(function(a, b) {
        return b.idx - a.idx;
      });

      let maxCount = data_with_idx_sorted[0].idx;

      let radius = (width / 2 - 20) / maxCount / 2;

      //   console.log(data_with_idx_sorted)
      const people = svg
        .selectAll(".gender")
        .data(data_with_idx)
        .enter()
        .append("g");

      people
        .append("line")
        .attr("x1", function(d) {
          return xRight(0);
        })
        .attr("y1", function(d) {
          return y(d.Age);
        })
        .attr("x2", function(d) {
          return width - margin.right;
        })
        .attr("y2", function(d) {
          return y(d.Age);
        })
        .attr("stroke", "gray")
        .style("stroke-dasharray", "3, 3");
      people
        .append("line")
        .attr("x1", function(d) {
          return xLeft(0);
        })
        .attr("y1", function(d) {
          return y(d.Age);
        })
        .attr("x2", function(d) {
          return margin.left;
        })
        .attr("y2", function(d) {
          return y(d.Age);
        })
        .attr("stroke", "gray")
        .style("stroke-dasharray", "3, 3");

      people
        .append("circle")
        .attr("cx", function(d) {
          if (d.Sex === "F") {
            return xRight(d.idx);
          } else {
            return xLeft(d.idx);
          }
        })
        .attr("cy", function(d) {
          return y(d.Age);
        })
        .attr("r", radius)
        .attr("fill", function(d) {
          if (d.Sex === "F") {
            return "#ff6666";
          } else {
            return "#66adca";
          }
        })
        .attr("stroke", function(d) {
          if (d["Fatal (Y/N)"] === "Y") {
            return "black";
          } else {
            return "none";
          }
        })
        .attr("stroke-width", function(d) {
          if (d["Fatal (Y/N)"] === "Y") {
            return "2px";
          } else {
            return "0px";
          }
        });
      let maleTotal = 0;
      let femaleTotal = 0;
      data.forEach(d => {
        if (d.Sex === "M") {
          maleTotal++;
        } else if (d.Sex === "F") {
          femaleTotal++;
        }
      });
      label
        .append("text")
        .text("Male")
        .attr("x", width / 2 - 200)
        .attr("y", y(82) - 4)
        .attr("text-anchor", "middle")
        .attr("font-size", "24px")
        .style("font-weight", "300")
        .style("font-family", "Roboto, sans-serif");

      label
        .append("text")
        .text("Female")
        .attr("x", width / 2 + 200)
        .attr("y", y(82) - 4)
        .attr("text-anchor", "middle")
        .attr("font-size", "24px")
        .attr("font-weight", "300")
        .style("font-family", "Roboto, sans-serif");
      label
        .append("text")
        .text(maleTotal)
        .attr("x", width / 2 - 200)
        .attr("y", y(77) - 14)
        .attr("text-anchor", "middle")
        .attr("font-size", "48px")
        .style("font-weight", "bold")
        .style("font-family", "Roboto, sans-serif")
        .style("fill", "#66adca");

      label
        .append("text")
        .text(femaleTotal)
        .attr("x", width / 2 + 200)
        .attr("y", y(77) - 14)
        .attr("text-anchor", "middle")
        .attr("font-size", "48px")
        .style("font-weight", "bold")
        .style("font-family", "Roboto, sans-serif")
        .style("fill", "#ff6666");
      label
        .append("text")
        .text("Total")
        .attr("x", width / 2 + 200)
        .attr("y", y(75) - 10)
        .attr("text-anchor", "middle")
        .attr("font-size", "24px")
        .style("font-weight", "300")
        .style("font-family", "Roboto, sans-serif");

      label
        .append("text")
        .text("Total")
        .attr("x", width / 2 - 200)
        .attr("y", y(75) - 10)
        .attr("text-anchor", "middle")
        .attr("font-size", "24px")
        .style("font-weight", "300")
        .style("font-family", "Roboto, sans-serif");

      const legend = svg.append("g");
      legend
        .append("circle")
        .attr("r", radius)
        .attr("cx", width / 2 - 150)
        .attr("cy", "10")
        .attr("fill", "#66adca");

      legend
        .append("text")
        .text("Male")
        .attr("x", width / 2 - 135)
        .attr("y", "16")
        .attr("font-size", "18px")
        .style("font-weight", "300")
        .style("font-family", "Roboto, sans-serif");

      legend
        .append("circle")
        .attr("r", radius)
        .attr("cx", width / 2 - 60)
        .attr("cy", "10")
        .attr("fill", "#ff6666");

      legend
        .append("text")
        .text("Female")
        .attr("x", width / 2 - 45)
        .attr("y", "16")
        .attr("font-size", "18px")
        .style("font-weight", "300")
        .style("font-family", "Roboto, sans-serif");

      legend
        .append("circle")
        .attr("r", radius)
        .attr("cx", width / 2 + 30)
        .attr("cy", "10")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", "2px")

      legend
        .append("text")
        .text("Death")
        .attr("x", width / 2 + 45)
        .attr("y", "16")
        .attr("font-size", "18px")
        .style("font-weight", "300")
        .style("font-family", "Roboto, sans-serif");
    }
  }
};
</script>

<style scoped>
.gender .title {
  text-align: center;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
}

.gender .title h3 {
  font-size: 1.5rem;
  font-family: "Merriweather", serif;
  color: black;
  font-weight: 900;
}

.gender-wrapper {
  /* width: 100%; */
  max-width: 800px;
  margin: 0px auto;
}
</style>
