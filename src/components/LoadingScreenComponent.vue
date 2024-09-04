<template>
  <div v-if="isLoading" class="loading-screen">
    <div class="loading-spinner"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    this.$bus.$on("loading", (isLoading) => {
      this.isLoading = isLoading;
    });
  },
};
</script>
  <style>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.502);
  z-index: 9999;
}

.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border: 3px solid #009856;
  border-top-color: #f8df00;
  border-radius: 50%;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
  