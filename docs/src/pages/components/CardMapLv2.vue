<template>
  <card-base title="Map" source_link="https://github.com/COVID-19-Modelling">
    <fig-tw-map v-on:change-loc="changeLoc"></fig-tw-map>
    <div>
      <p v-if="foot !== 'unselect'">{{ foot }}</p>
      <p v-else>Select a country</p>
    </div>
  </card-base>
</template>

<script>
import CardBase from "./CardBase";
import FigTwMap from "./figures/FigTwMap";

export default {
  name: "chart-map-lv-2",
  components: {
    CardBase,
    FigTwMap,
  },
  data() {
    return {
      selected: null,
      foot: "",
    };
  },
  methods: {
    changeLoc(e) {
      this.foot = e;
      this.$emit("change-loc", e);
    },
  },
};
</script>
