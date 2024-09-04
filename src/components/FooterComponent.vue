<template>
  <footer class="mt-auto">
    <section class="footer">
      <div class="container">
        <div class="row content-footer" v-if="!isSearchRoute">
          <div class="col-md-2">
            <div class="logo">
              <img src="../assets/img/logoblack.png" alt="" />
            </div>
            <div class="contact information mt-3">
              <div class="content-info">
                <p>
                  <router-link to="/privacy">Kebijakan Privasi</router-link>
                </p>
                <p>
                  <router-link to="/terms">Syarat dan Ketentuan</router-link>
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-2">
            <div class="information mt-3">
              <div class="title-info">
                <p>Menu</p>
              </div>
              <div class="content-info">
                <p><router-link to="/">Home</router-link></p>
                <p><router-link to="/product">Produk</router-link></p>
                <p><router-link to="/cart">Keranjang</router-link></p>
                <p>
                  <router-link uter-link to="/wishlist">Wishlist</router-link>
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="pembayaran mt-3">
              <div class="title-bayar">
                <p>Pembayaran</p>
              </div>
              <div class="content-bayar">
                <img src="../assets/img/mandiri.png" alt="" />
                <img src="../assets/img/bni.png" alt="" />
                <img src="../assets/img/bri.png" alt="" />
                <img src="../assets/img/bca.png" alt="" />
                <img src="../assets/img/ovo.png" alt="" />
                <img src="../assets/img/dana.png" alt="" />
                <img src="../assets/img/qris.png" alt="" />
                <img src="../assets/img/link.png" alt="" />
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="pembayaran mt-3">
              <div class="title-bayar">
                <p>Pengiriman</p>
              </div>
              <div class="content-bayar">
                <img src="../assets/img/jne.png" alt="" />
                <img src="../assets/img/jnt.png" alt="" />
                <img src="../assets/img/sicepat.png" alt="" />
                <img src="../assets/img/anteraja.png" alt="" />
                <img src="../assets/img/lion.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="cta">
          <div class="img" v-if="sosmed">
            <a
              v-b-tooltip.hover="'Facebook '"
              v-if="sosmed.facebook"
              :href="sosmed.facebook"
              target="_blank"
              ><img src="../assets/img/fb.png" alt=""
            /></a>
            <a
              v-b-tooltip.hover="'Instagram '"
              v-if="sosmed.instagram"
              :href="sosmed.instagram"
              target="_blank"
              ><img src="../assets/img/ig.png" alt=""
            /></a>
            <a
              v-b-tooltip.hover="'Whatsapp'"
              v-if="sosmed.whatsapp"
              :href="`https://api.whatsapp.com/send?phone=62${sosmed.whatsapp}`"
              target="_blank"
              ><img src="../assets/img/wa.png" alt=""
            /></a>
          </div>
          <div class="cr">Copyright © 2023 Gadgetshop All rights reserved.</div>
        </div>
      </div>
    </section>
  </footer>
</template>

<script>
import apis from "@/apis";
export default {
  name: "FooterComponent",
  data() {
    return {
      sosmed: null,
    };
  },
  computed: {
    isSearchRoute() {
      return (
        this.$route.name === "Search" || this.$route.name === "MitraDetail"
      );
    },
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
