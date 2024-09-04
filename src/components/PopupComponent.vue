<template>
  <div class="popup-wa" v-if="sosmed">
    <a
      v-b-tooltip.hover="'Hubungi Admin '"
      :href="`https://api.whatsapp.com/send?phone=62${sosmed.whatsapp}&text=Halo+Admin+saya+ingin+bertanya`"
      class="float"
      target="_blank"
    >
      <font-awesome-icon icon="fa-brands fa-whatsapp " class="my-float" />
    </a>
  </div>
</template>
  <script>
import apis from "@/apis";
export default {
  name: "PopupComponent",
  data() {
    return {
      sosmed: null,
    };
  },
  async mounted() {
    try {
      const response = await apis.apis.post(apis.PublicPath + "/sosmed");
      this.sosmed = response.data[0];
    } catch (error) {
      // console.error(error);
    }
  },
};
</script>
  
  <style></style>
  