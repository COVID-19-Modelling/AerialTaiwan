<template>
  <div class="fixed-plugin">
    <a
      class="px-3 py-2 fixed-plugin-button text-dark position-fixed"
      @click="toggle"
    >
      <i class="material-icons py-2">settings</i>
    </a>
    <div class="shadow-lg card">
      <div class="pt-3 pb-0 bg-transparent card-header">
        <div class="float-start">
          <h5 class="mt-3 mb-0">UI Configurator</h5>
        </div>
        <div class="mt-4 float-end" @click="toggle">
          <button class="p-0 btn btn-link text-dark fixed-plugin-close-button">
            <i class="material-icons">clear</i>
          </button>
        </div>
        <!-- End Toggle Button -->
      </div>
      <hr class="my-1 horizontal dark" />
      <div class="pt-0 card-body pt-sm-3">
        <!-- Sidebar Backgrounds -->
        <div>
          <h6 class="mb-0">Sidebar Colors</h6>
        </div>
        <a href="#" class="switch-trigger background-color">
          <div
            class="my-2 badge-colors"
            :class="this.$store.state.isRTL ? 'text-end' : ' text-start'"
          >
            <span
              class="badge filter bg-gradient-primary"
              data-color="primary"
              @click="sidebarColor('primary')"
            ></span>
            <span
              class="badge filter bg-gradient-dark"
              data-color="dark"
              @click="sidebarColor('dark')"
            ></span>
            <span
              class="badge filter bg-gradient-info"
              data-color="info"
              @click="sidebarColor('info')"
            ></span>
            <span
              class="badge filter bg-gradient-success"
              data-color="success"
              @click="sidebarColor('success')"
            ></span>
            <span
              class="badge filter bg-gradient-warning"
              data-color="warning"
              @click="sidebarColor('warning')"
            ></span>
            <span
              class="badge filter bg-gradient-danger"
              data-color="danger"
              @click="sidebarColor('danger')"
            ></span>
          </div>
        </a>
        <!-- Sidenav Type -->
        <div class="mt-3">
          <h6 class="mb-0">Sidenav Type</h6>
        </div>
        <div class="d-flex">
          <button
            id="btn-dark"
            class="px-3 mb-2 btn bg-gradient-dark"
            :class="
              this.$store.state.sidebarType === 'bg-gradient-dark'
                ? 'active'
                : ''
            "
            @click="sidebarType('bg-gradient-dark')"
          >
            Dark
          </button>
          <button
            id="btn-transparent"
            class="px-3 mb-2 btn bg-gradient-dark ms-2"
            :class="
              this.$store.state.sidebarType === 'bg-transparent' ? 'active' : ''
            "
            @click="sidebarType('bg-transparent')"
          >
            Transparent
          </button>
          <button
            id="btn-white"
            class="px-3 mb-2 btn bg-gradient-dark ms-2"
            :class="
              this.$store.state.sidebarType === 'bg-white' ? 'active' : ''
            "
            @click="sidebarType('bg-white')"
          >
            White
          </button>
        </div>
        <p class="text-sm d-xl-none d-block mt-2">
          You can change the sidenav type just on desktop view.
        </p>

        <!-- Navbar Fixed -->
        <hr class="horizontal dark my-3" />
        <div class="mt-2 d-flex">
          <h6 class="mb-0">Light / Dark</h6>
          <div class="form-check form-switch ps-0 ms-auto my-auto">
            <input
              class="form-check-input mt-1 ms-auto"
              type="checkbox"
              :checked="this.$store.state.isDarkMode"
              @click="darkMode"
            />
          </div>
        </div>
        <hr class="horizontal dark my-sm-4" />
        <div class="text-center w-100">
          <h6 class="mt-3">Links</h6>
          <a
            href="https://github.com/COVID-19-Modelling/AerialTaiwan/"
            class="mb-0 btn btn-dark me-2"
            target="_blank"
          >
            <i class="fab fa-github-alt me-1" aria-hidden="true"></i> Github
          </a>
          <a
            href="https://data.gov.tw/"
            class="mb-0 btn btn-dark me-2"
            target="_blank"
          >
            <i class="fas fa-database me-1" aria-hidden="true"></i> Data
          </a>
        </div>

        <hr class="horizontal dark my-sm-4" />
        <div class="text-center w-100">
          <h6 class="mt-3">Website materials</h6>
          <ul class="list-group">
            <li class="list-group-item">
              <a href="https://www.creative-tim.com/" target="_blank">
                Creative Tim
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/taiwan"
                title="taiwan icons"
                target="_blank"
              >
                Taiwan icons created by Freepik - Flaticon
              </a>
            </li>
            <li class="list-group-item">
              <a
                href="https://www.flaticon.com/free-icons/taiwan"
                title="taiwan icons"
                target="_blank"
              >
                Taiwan icons created by Prosymbols Premium - Flaticon
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { activateDarkMode, deactivateDarkMode } from "@/assets/js/dark-mode";

export default {
  name: "configurator",
  props: ["toggle"],
  methods: {
    ...mapMutations(["navbarMinimize", "sidebarType", "navbarFixed"]),

    sidebarColor(color = "success") {
      document.querySelector("#sidenav-main").setAttribute("data-color", color);
      this.$store.state.mcolor = color;
    },

    sidebarType(type) {
      this.$store.state.sidebarType = type;
    },

    setNavbarFixed() {
      if (
        this.$route.name !== "Profile" ||
        this.$route.name !== "All Projects"
      ) {
        this.$store.state.isNavFixed = !this.$store.state.isNavFixed;
      }
    },

    darkMode() {
      if (this.$store.state.isDarkMode) {
        this.$store.state.isDarkMode = false;
        deactivateDarkMode();
        return;
      } else {
        this.$store.state.isDarkMode = true;
        activateDarkMode();
      }
    },

    sidenavTypeOnResize() {
      let transparent = document.querySelector("#btn-transparent");
      let white = document.querySelector("#btn-white");
      if (window.innerWidth < 1200) {
        transparent.classList.add("disabled");
        white.classList.add("disabled");
      } else {
        transparent.classList.remove("disabled");
        white.classList.remove("disabled");
      }
    },
  },
  computed: {
    sidenavResponsive() {
      return this.sidenavTypeOnResize;
    },
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";
    window.addEventListener("resize", this.sidenavTypeOnResize);
    window.addEventListener("load", this.sidenavTypeOnResize);
  },
};
</script>
