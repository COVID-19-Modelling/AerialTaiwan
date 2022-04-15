<template>
  <div class="py-4 container-fluid">
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="row">
          <div class="col-lg-6 col-md-6">
            <card-map-lv-2 v-on:change-loc="changeLocation" />
          </div>
          <div class="row col-lg-6">
            <div
              class="col-lg-4 col-md-6 col-sm-6 mt-lg-0 mt-4"
              v-for="(stat, i) in Stats"
              :key="i"
            >
              <card-stats
                :title="stat.title"
                :value="stat.value"
                :percentage="stat.change"
                valueColor="text-danger"
                :iconName="stat.iconName"
                detail="than yesterday"
                iconClass="text-white"
                :iconBackground="stat.iconBackground"
              />
            </div>
            <div class="row">
              <div class="col-lg-12 col-md-12">
                <card-plotly
                  title="Daily cases"
                  plot_id="test1"
                  source_link="http://localhost:8000/"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CardStats from "./components/CardStats.vue";
import CardPlotly from "./components/CardPlotly.vue";
import CardMapLv2 from "./components/CardMapLv2";
import * as d3 from "d3";

export default {
  name: "subnational",
  components: {
    CardStats,
    CardPlotly,
    CardMapLv2,
  },
  data() {
    return {
      Stats: [
        {
          title: "New cases",
          value: "100",
          change: "+55%",
          iconName: "people",
          iconBackground: "bg-gradient-info",
        },
        {
          title: "New critical",
          value: "200",
          change: "+5%",
          iconName: "local_hospital",
          iconBackground: "bg-gradient-warning",
        },
        {
          title: "New deaths",
          value: "300",
          change: "+33%",
          iconName: "dangerous",
          iconBackground: "bg-gradient-dark",
        },
      ],
      RawData: null,
      Location: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.RawData = await d3.json(
        // "https://od.cdc.gov.tw/eic/Age_County_Gender_day_19Cov.json"
        "/Age_County_Gender_day_19Cov.json"
      );
    },
    changeLocation() {},
  },
};
</script>
