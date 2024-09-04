<template>
  <div
    id="app"
    :class="[routeClass, { fadeOut: refreshing }]"
    :style="appStyle"
  >
    <!-- <NavbarComponent /> -->
    <router-view />
    <loading-screen-component />

    <footer-component v-if="isFooterVisible" :class="footerClass" />
    <popup-component v-if="isPopuperVisible" />
  </div>
</template>

<script>
import FooterComponent from "./components/FooterComponent.vue";
import LoadingScreenComponent from "./components/LoadingScreenComponent.vue";
import PopupComponent from "./components/PopupComponent.vue";
// import NavbarComponent from "./components/NavbarComponent.vue";

export default {
  components: { FooterComponent, PopupComponent, LoadingScreenComponent },
  name: "App",
  data() {
    return {
      refreshing: false,
      isFooterVisible: true,
      isPopuperVisible: true,
      // loading: false,
    };
  },

  computed: {
    routeClass() {
      return this.$route.name;
    },
    appStyle() {
      return {
        backgroundColor:
          this.$route.name === "Search" || this.$route.name === "MitraDetail"
            ? "#f5f5f5"
            : "#ebf9f3",
      };
    },
    footerClass() {
      return this.$route.name === "Search" || this.$route.name === "MitraDetail"
        ? "padding-search"
        : "";
    },
  },
  mounted() {
    window.addEventListener("beforeunload", () => {
      this.refreshing = true;
    });
  },
  created() {
    this.hideComponentsIfNeeded();
  },
  methods: {
    hideComponentsIfNeeded() {
      const currentRouteName = this.$route.name;
      if (currentRouteName === "NotFound" || currentRouteName === "Invoice") {
        this.isFooterVisible = false;
        this.isPopuperVisible = false;
      }
    },
  },
};
</script>

<style>
.fadeOut {
  animation: 0.5s ease;
}
.padding-search .footer {
  padding-bottom: 20px;
}
</style>
<head>
  <title>{{ $metaInfo.title }}</title>
</head>
