<template>
  <div class="hemisphere">
    <div class="title">
      <h3>Cases by hemisphere</h3>
    </div>
    <div class="hemisphere-wrapper" ref="hemisphere_container">
      <svg ref="hemisphere" />
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import hemisphere_data from "~/src/data/hemisphere_sum.json";
export default {
  name: "Hemisphere",
  data() {
    return {
      hemisphere_data: hemisphere_data,
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
    this.width = this.$refs.hemisphere_container.offsetWidth;
    this.height = 400;
    this.createChart();
  },
  methods: {
    createChart() {
      const data_raw = this.hemisphere_data;

      const parseDate = d3.timeParse("%Y");
      data_raw.forEach(e => {
        e.year = parseDate(e.year);
      });

      let data = [
        { name: "North", values: [] },
        { name: "South", values: [] }
      ];
      data_raw.forEach(e => {
        let objNorth = {};
        objNorth.year = e.year;
        objNorth.total = e.cases[0].total;
        objNorth.deaths = e.cases[0].death;
        let objSouth = {};
        objSouth.year = e.year;
        objSouth.total = e.cases[1].total;
        objSouth.deaths = e.cases[1].death;
        data[0].values.push(objNorth);
        data[1].values.push(objSouth);
      });

      const svgDom = this.$refs.hemisphere;

      const height = this.width * 0.6;
      const width = this.width;

      const margin = { top: 30, bottom: 100, left: 20, right: 20 };
      const svg = d3
        .select(svgDom)
        .attr("width", "100%")
        .attr("height", height);

      const x = d3
        .scaleTime()
        .domain(
          d3.extent(data_raw, function(d) {
            return d.year;
          })
        )
        .range([margin.left, width - margin.right]);

      const yTop = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function(d) {
            return d3.max(d.values, function(v) {
              return v.total;
            });
          })
        ])
        .range([height / 2, margin.top]);

      const yBottom = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function(d) {
            return d3.max(d.values, function(v) {
              return v.total;
            });
          })
        ])
        .range([height / 2, height - margin.bottom]);

      const sphere = svg
        .selectAll(".sphere")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "sphere");

      const lineGeneratorTop = d3
        .line()
        .x(function(d) {
          return x(d.year);
        })
        .y(function(d) {
          return yTop(+d.total);
        });

      const lineGeneratorTopDeath = d3
        .line()
        .x(function(d) {
          return x(d.year);
        })
        .y(function(d) {
          return yTop(+d.deaths);
        });

      const lineGeneratorBottom = d3
        .line()
        .x(function(d) {
          return x(d.year);
        })
        .y(function(d) {
          return yBottom(+d.total);
        });

      const lineGeneratorBottomDeath = d3
        .line()
        .x(function(d) {
          return x(d.year);
        })
        .y(function(d) {
          return yBottom(+d.deaths);
        });

      const areaGeneratorTop = d3
        .area()
        .x(function(d) {
          return x(d.year);
        })
        .y0(height / 2)
        .y1(function(d) {
          return yTop(d.total);
        });

      const areaGeneratorBottom = d3
        .area()
        .x(function(d) {
          return x(d.year);
        })
        .y0(height / 2)
        .y1(function(d) {
          return yBottom(d.total);
        });

      const areaGeneratorTopDeath = d3
        .area()
        .x(function(d) {
          return x(d.year);
        })
        .y0(height / 2)
        .y1(function(d) {
          return yTop(d.deaths);
        });

      const areaGeneratorBottomDeath = d3
        .area()
        .x(function(d) {
          return x(d.year);
        })
        .y0(height / 2)
        .y1(function(d) {
          return yBottom(d.deaths);
        });

      sphere
        .append("path")
        .attr("class", "line")
        .attr("d", function(d) {
          if (d.name === "North") {
            return lineGeneratorTop(d.values);
          } else {
            return lineGeneratorBottom(d.values);
          }
        })
        .attr("stroke", function(d) {
          if (d.name === "North") {
            return "#ffe5e5";
          } else {
            return "#e5f1f6";
          }
        })
        .attr("fill", "none");

      sphere
        .append("path")
        .attr("class", "area")
        .attr("fill", function(d) {
          if (d.name === "North") {
            return "#ffe5e5";
          } else {
            return "#e5f1f6";
          }
        })
        .attr("d", function(d) {
          if (d.name === "North") {
            return areaGeneratorTop(d.values);
          } else {
            return areaGeneratorBottom(d.values);
          }
        });

      sphere
        .append("path")
        .attr("class", "line")
        .attr("d", function(d) {
          if (d.name === "North") {
            return lineGeneratorTopDeath(d.values);
          } else {
            return lineGeneratorBottomDeath(d.values);
          }
        })
        .attr("stroke", function(d) {
          if (d.name === "North") {
            return "#ff3232";
          } else {
            return "#1984af";
          }
        })
        .attr("fill", "none");

      sphere
        .append("path")
        .attr("class", "area")
        .attr("fill",  function(d) {
          if (d.name === "North") {
            return "#ff3232";
          } else {
            return "#1984af";
          }
        })
        .attr("d", function(d) {
          if (d.name === "North") {
            return areaGeneratorTopDeath(d.values);
          } else {
            return areaGeneratorBottomDeath(d.values);
          }
        });

      // .attr("stroke-dashoffset", 0)

      const container = this.$refs.hemisphere_container;
      const tooltip = d3
        .select(container)
        .append("div")
        .attr("id", "tooltip")
        .style("position", "absolute")
        .style("background-color", "rgba(53, 63, 76, 0.90)")
        .style("padding-top", "10px")
        .style("padding-bottom", "5px")
        .style("padding-left", "10px")
        .style("padding-right", "10px")
        .style("border-radius", "4px")
        .style("border-width", "1px")
        .style("border-color", "#abb9c")
        .style("display", "none");

      const mouseG = svg.append("g").attr("class", "mouse-over-effects");

      mouseG
        .append("path") // create vertical line to follow mouse
        .attr("class", "mouse-line")
        .style("stroke", "#A9A9A9")
        .style("stroke-width", "2px")
        .style("opacity", "0");

      const lines = document.getElementsByClassName("line");

      const mousePerLine = mouseG
        .selectAll(".mouse-per-line")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "mouse-per-line");

      mouseG
        .append("svg:rect") // append a rect to catch mouse movements on canvas
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("mouseout", function() {
          // on mouse out hide line, circles and text
          d3.select(".mouse-line").style("opacity", "0");
          d3.selectAll(".mouse-per-line circle").style("opacity", "0");
          d3.selectAll(".mouse-per-line text").style("opacity", "0");
          d3.selectAll("#tooltip").style("display", "none");
        })
        .on("mouseover", function() {
          // on mouse in show line, circles and text
          d3.select(".mouse-line")
            .style("opacity", "1")
            .style("stroke-dasharray", "3, 3");
          d3.selectAll("#tooltip").style("display", "block");
        })
        .on("mousemove", function() {
          // update tooltip content, line, circles and text when mouse moves
          let mouse = d3.mouse(this);

          d3.selectAll(".mouse-per-line").attr("transform", function(d, i) {
            let xDate = x.invert(mouse[0]); // use 'invert' to get date corresponding to distance from mouse position relative to svg
            let bisect = d3.bisector(function(d) {
              return d.year;
            }).left; // retrieve row index of date on parsed csv
            let idx = bisect(d.values, xDate);

            d3.select(".mouse-line").attr("d", function() {
              let data = "M" + x(d.values[idx].year) + "," + (height-margin.bottom);
              data += " " + x(d.values[idx].year) + "," + 0;
              return data;
            });
            return (
              "translate(" +
              x(d.values[idx].year) +
              "," +
              yTop(d.values[idx].total) +
              ")"
            );
          });

          updateTooltipContent(mouse, data);
        });

      function updateTooltipContent(mouse, data) {
        let sortingObj = [];
        data.map(d => {
          var xDate = x.invert(mouse[0]);

          var bisect = d3.bisector(function(d) {
            return d.year;
          }).left;
          var idx = bisect(d.values, xDate);

          sortingObj.push({
            key: d.name,
            total: d.values[idx].total,
            deaths: d.values[idx].deaths,
            year: d.values[idx].year.getFullYear()
          });
        });

        sortingObj.sort(function(x, y) {
          return d3.descending(x.total, y.total);
        });

        var sortingArr = sortingObj.map(d => d.key);

        var data_copy = data.slice().sort(function(a, b) {
          return sortingArr.indexOf(a.key) - sortingArr.indexOf(b.key); // rank vehicle category based on price of premium
        });
        // console.log(data_copy)
        tooltip
          .html(
            `<div style="text-align: center"><span style="font-weight: bold">${sortingObj[0].year}</span></div><hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD">`
          )
          .style("display", "block")
          .style("color", "white")
          .style("left", d3.event.pageX + 20 + "px")
          .style("top", d3.event.pageY - 20 + "px")
          .style("font-size", "14px")
          .selectAll()
          .data(data_copy)
          .enter() // for each vehicle category, list out name and price of premium
          .append("div")
          .style("color", "#cccccc")
          .style("font-size", "12px")
          .style("margin-bottom", "6px")
          .html(d => {
            var xDate = x.invert(mouse[0]);
            var bisect = d3.bisector(function(d) {
              return d.year;
            }).left;
            var idx = bisect(d.values, xDate);

            return `<span style="color: #ffffff; font-weight: bold"> ${d.name}</span><br>Total Cases: <span style="font-weight: bold; color: white">${d.values[idx].total}</span><br>Deaths: <span style="font-weight: bold; color: white">${d.values[idx].deaths}</span>`;
          });
      }

      svg
        .append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height / 2 + ")")
        .call(d3.axisBottom(x));

      d3.selectAll(".domain")
        .attr("stroke", "#E5E5E5")
        .attr("stroke-width", "2px");

      d3.selectAll(".xAxis line").remove();

      d3.selectAll(".xAxis text")
        .style("font-size", "12px")
        .style("color", "#4a4a4a");

      const legend = svg.append("g");
      legend
        .append("circle")
        .attr("r", "8")
        .attr("cx", width / 2 - 220)
        .attr("cy", height - 80)
        .attr("fill", "#ffcccc");

      legend
        .append("text")
        .text("Northen Hemisphere Cases")
        .attr("x", width / 2 - 200)
        .attr("y", height - 75)
        .attr("fill", "black")
        .style("font-weight", "300")
        .style("font-family", "Roboto, sans-serif");

      legend
        .append("circle")
        .attr("r", "8")
        .attr("cx", width / 2 + 20)
        .attr("cy", height - 80)
        .attr("fill", "#ff3232");

      legend
        .append("text")
        .text("Northen Hemisphere Death")
        .attr("x", width / 2 + 40)
        .attr("y", height - 75)
        .attr("fill", "black")
        .style("font-weight", "300")
        .style("font-family", "Roboto, sans-serif");

         legend
        .append("circle")
        .attr("r", "8")
        .attr("cx", width / 2 - 220)
        .attr("cy", height - 30)
        .attr("fill", "#e5f1f6");

      legend
        .append("text")
        .text("Southen Hemisphere Cases")
        .attr("x", width / 2 - 200)
        .attr("y", height - 25)
        .attr("fill", "black")
        .style("font-weight", "300")
        .style("font-family", "Roboto, sans-serif");

      legend
        .append("circle")
        .attr("r", "8")
        .attr("cx", width / 2 + 20)
        .attr("cy", height - 30)
        .attr("fill", "#1984af");

      legend
        .append("text")
        .text("Southen Hemisphere Death")
        .attr("x", width / 2 + 40)
        .attr("y", height - 25)
        .attr("fill", "black")
        .style("font-weight", "300")
        .style("font-family", "Roboto, sans-serif");
    }
  }
};
</script>

<style scoped>
.hemisphere .title {
  text-align: center;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
}

.hemisphere .title h3 {
  font-size: 1.5rem;
  font-family: "Merriweather", serif;
  color: black;
  font-weight: 900;
}

.hemisphere-wrapper {
  max-width: 600px;
  margin: 0px auto;
}

@media only screen and (min-width: 768px) {
  .hemisphere-wrapper {
    max-width: 800px;
  }
}

@media only screen and (min-width: 1920px) {
  .hemisphere-wrapper {
    max-width: 1000px;
  }
}

.xAxis text {
  font-size: 1em;
  /* color: rgb(74, 74, 74); */
}
</style>
