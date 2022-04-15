<template>
  <div>
    <svg id="sub_tw_lv2"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import geojson from "@/assets/map/gadm40_TWN_2.json";
import * as turf from "@turf/turf";

export default {
  name: "FigTwMap",
  data() {
    geojson.features = geojson.features.map(function (feature) {
      return turf.rewind(feature, { reverse: true });
    });

    return {
      geojson: geojson,
      selected: null,
      svg: null,
      g: null,
      width: null,
      height: null,
    };
  },
  props: {
    asp: {
      type: Number,
      default: 1,
    },
  },
  mounted() {
    this.initialise();
    this.svg.on("resize", this.resize);
  },
  methods: {
    initialise() {
      this.svg = d3.select("svg#sub_tw_lv2");

      const width = this.svg.node().parentNode.clientWidth;
      const height = width * this.asp;
      this.width = width;
      this.height = height;
      this.svg.attr("width", width).attr("height", height);

      const svg = this.svg;

      // Map and projection
      const projection = d3
        .geoMercator()
        .center([121, 24])
        .translate([width / 2, height / 2])
        .fitSize([width, height], this.geojson);

      svg
        .append("g")
        .selectAll("path")
        .data(this.geojson.features)
        .join("path")
        .attr("class", "county")
        .attr("d", d3.geoPath().projection(projection))
        .attr("fill", "#eee")
        .style("stroke", "#1d466c")
        .on("click", this.selectCountry);
    },
    update() {
      const projection = d3
        .geoMercator()
        .center([121, 24])
        .translate([this.width / 2, this.height / 2])
        .fitSize([this.width, this.height], this.geojson);

      this.svg.selectAll("path.county").join(
        (enter) => {
          enter
            .append("path")
            .attr("class", "county")
            .attr("d", d3.geoPath().projection(projection))
            .attr("fill", "#ddd")
            .style("stroke", "#1d466c")
            .on("click", this.selectCountry);
        },
        (update) => {
          update.attr("fill", (d) => {
            console.log(d);
            return d.properties.NAME_2 === this.selected ? "#e22" : "#ddd";
          });
        }
      );
    },
    selectCountry(evt) {
      const loc = evt.target.__data__.properties.NAME_2;
      if (this.selected === loc) {
        this.selected = null;
        this.$emit("change-loc", "unselect");
        this.update();
      } else {
        this.selected = loc;
        this.$emit("change-loc", loc);
      }
      this.update();
    },
    resize() {
      const width = this.svg.node().parentNode.clientWidth;
      const height = width * this.asp;
      this.width = width;
      this.height = height;
      this.svg.attr("width", width).attr("height", height);
    },
  },
};
</script>

<style scoped>
path {
  fill-opacity: 0.4;
  fill: #0d6efd;
  stroke: #bb1313;
}
</style>
