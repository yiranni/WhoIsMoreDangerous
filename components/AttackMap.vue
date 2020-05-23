<template>
  <div class="map">
    <div class="title">
      <h3>Cases around the world</h3>
    </div>
    <div class="wrapper">
      <ejs-maps :legendSettings="legendSettings" :tooltipRender="tooltipRender">
        <e-layers>
          <e-layer
            :shapeData="shapeData"
            :shapePropertyPath="shapePropertyPath"
            :shapeDataPath="shapeDataPath"
            :dataSource="dataSource"
            :shapeSettings="shapeSettings"
            :highlightSettings="highlightSettings"
            :tooltipSettings="tooltipSettings"
          ></e-layer>
        </e-layers>
      </ejs-maps>
    </div>
    <div class="instruction">
      <div style="margin-right: 16px">
       <i class="fas fa-mouse"></i>
      </div>
      <div>
        <p>Hover or tap to explore data</p>
      </div>
    </div>
  </div>
</template>


<script>
import * as d3 from "d3";
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'


import attackData from "~/src/data/attacks.json";
import Template from "~/components/tooltip-temp.vue";
import caseSummary from "~/src/data/caseSummary.json";
import test from "~/src/data/test.json";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret)
import {
  MapsComponent,
  MapsPlugin,
  Legend,
  Highlight,
  MapsTooltip
} from "@syncfusion/ej2-vue-maps";
import worldMap from "~/src/data/map/world-map.json";
import Vue from "vue";
Vue.use(MapsPlugin);

export default {
  name: "AttackMap",
  components: {},
  data() {
    return {
      attackData: attackData,

      shapeData: worldMap,
      shapeDataPath: "name",
      shapePropertyPath: "name",
      dataSource: caseSummary,
      shapeSettings: {
        colorValuePath: "cases",
        fill: "#E5E5E5",
        colorMapping: [
          {
            from: 1,
            to: 10,
            color: "#ffcccc"
          },
          {
            from: 10,
            to: 100,
            color: "#ff9999"
          },
          {
            from: 100,
            to: 500,
            color: "#ff7f7f"
          },
          {
            from: 500,
            to: 800,
            color: "#ff6666"
          },
          {
            from: 800,
            to: 1500,
            color: "#ff3232"
          }
        ]
      },
      legendSettings: {
        visible: true,
        position: "Bottom",
        alignment: "Center"
      },
      highlightSettings: {
        enable: true,
        // fill: "none",
        border: { color: "gray", width: 1 }
      },

      tooltipSettings: {
        visible: true,
        valuePath: "name",
        template: function() {
          return { template: Template };
        }
      }
    };
  },
  provide: {
    maps: [Legend, Highlight, MapsTooltip]
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {},
    tooltipRender: function(args) {
      if (!args.options.data) {
        args.cancel = true;
      }
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");


.map .title {
  text-align: center;
  margin-top: 1em;
  margin-bottom: 1em;
}

.map .title h3 {
  font-size: 1.5rem;
  font-family: "Merriweather", serif;
  color: black;
  font-weight: 900;
}

.wrapper {
  max-width: 800px;
 
  /* max-height: 1200px; */
  margin: 0px auto;
}

.instruction {
  max-width: 280px;
  background-color: transparent;
  padding: 10px 10px 10px 20px;
  margin: 30px auto;
  display: flex;
  align-items: center;
}

.instruction p {
  color:  #616161;;
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
}
.instruction .fa-mouse {
    font-size:  32px;
    color: #616161;
    padding-top: 4px;
}
</style>
