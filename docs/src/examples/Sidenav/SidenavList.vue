<template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item" v-for="item in items" :key="item.ref">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          :collapseRef="item.ref"
          :navText="item.text"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">{{ item.icon }}</i>
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
</template>
<script>
import SidenavCollapse from "./SidenavCollapse.vue";
import navi from "../../router/navi.json";

export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    console.log(navi);
    return {
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active",
      items: navi,
    };
  },
  components: {
    SidenavCollapse,
  },
};
</script>
