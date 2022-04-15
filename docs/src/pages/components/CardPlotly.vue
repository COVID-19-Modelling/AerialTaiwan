<template>
  <div class="card mb-2">
    <div class="card-header p-3 pt-2">
      <div class="col-6 d-flex align-items-center">
        <h6 class="mb-0">{{ title }}</h6>
      </div>
    </div>
    <div class="card-body p-3">
      <div :id="plot_id" v-on:plotly_click="click"></div>
    </div>
    <hr class="dark horizontal my-0" />
    <div class="card-footer p-3 text-end">
      <p class="mb-0">
        <a :href="source_link" target="_blank">Data source</a>
      </p>
    </div>
  </div>
</template>

<script>
import Plotly from "plotly.js";

export default {
  name: "card-stats",
  data() {
    const trace1 = {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      mode: "markers",
      type: "scatter",
    };

    const trace2 = {
      x: [2, 3, 4, 5],
      y: [16, 5, 11, 9],
      mode: "lines",
      type: "scatter",
    };

    const trace3 = {
      x: [1, 2, 3, 4],
      y: [12, 9, 15, 12],
      mode: "lines+markers",
      type: "scatter",
    };

    return {
      plot_data: [trace1, trace2, trace3],
      plot_layout: {},
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    plot_id: {
      type: String,
      required: true,
    },
    source_link: {
      type: String,
      required: true,
    },
  },
  mounted() {
    Plotly.newPlot(this.plot_id, this.plot_data, this.plot_data, {
      displayModeBar: false,
    });
    document.getElementById(this.plot_id).on("plotly_click", this.click);
  },
  methods: {
    click: function (evt) {
      console.log(evt);
      alert("You clicked this Plotly chart!");
    },
  },
};
</script>
