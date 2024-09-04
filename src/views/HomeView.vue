<template>
  <div class="home">
    <navbar-component />
    <section class="hero">
      <div class="container">
        <div class="content d-none d-md-block">
          <div class="row">
            <div class="col-md-6 col-hero">
              <div>
                <h3>Belanja Praktis, Produk Terbaik</h3>
                <h5>
                  Temukan produk terbaru dan terlengkap dengan harga terjangkau
                  hanya di sini. Belanja online dengan aman dan nyaman, kapan
                  saja dan di mana saja.
                </h5>
                <div>
                  <router-link to="/product" class="btn btn-light"
                    >Mulai Belanja
                    <font-awesome-icon
                      :icon="['fas', 'arrow-right']"
                      beat-fade
                      style="color: #00985b"
                      class="ms-1"
                  /></router-link>
                  <a
                    href="https://linktr.ee/Gadgetshopindonesia"
                    class="ms-2 btn btn-market"
                  >
                    Marketplace
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <img src="../assets/img/img-hero.png" alt="" loading="lazy" />
            </div>
          </div>
        </div>
        <div class="content d-block d-md-none">
          <div class="row">
            <div class="col-md-6">
              <img src="../assets/img/img-hero.png" alt="" loading="lazy" />
            </div>
            <div class="col-md-5">
              <div>
                <h3>Belanja Praktis, Produk Terbaik</h3>
                <h5>
                  Temukan produk terbaru dan terlengkap dengan harga terjangkau
                  hanya di sini. Belanja online dengan aman dan nyaman, kapan
                  saja dan di mana saja.
                </h5>
                <div>
                  <router-link to="/product" class="btn btn-light"
                    >Mulai Belanja
                    <font-awesome-icon
                      :icon="['fas', 'arrow-right']"
                      beat-fade
                      style="color: #00985b"
                      class="ms-1"
                  /></router-link>
                  <a
                    href="https://linktr.ee/Gadgetshopindonesia"
                    class="btn btn-market"
                  >
                    Marketplace
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-kategori">
      <div class="container">
        <div class="kategori">
          <div class="header">
            <span class="title">Kategori Produk </span>
          </div>
          <div class="kategori_items">
            <router-link
              :to="'/product-kategori/' + categori.id_kategori"
              class="kategori_item"
              v-for="categori in categories"
              :key="categori.id"
            >
              <div class="kategori_item_img">
                <img
                  :src="`${BASE_URL}kategori/${categori.image}`"
                  alt=""
                  loading="lazy"
                />
              </div>
              <div class="kategori_item_title">
                {{ categori.nama_kategori }}
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container d-none d-md-block">
        <a
          href="https://gadgetcare.co.id/lokasi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            class="mt-3"
            src="../assets/img/promo.png"
            style="width: 100%"
            alt=""
          />
        </a>
      </div>
      <div class="d-md-none">
        <a
          href="https://gadgetcare.co.id/lokasi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="../assets/img/promo.png" style="width: 100%" alt="" />
        </a>
      </div>
    </section>

    <section class="bg-best-product">
      <div class="container">
        <div class="content-best">
          <div class="header">
            <span
              >Produk Terbaik
              <font-awesome-icon
                :icon="['fas', 'thumbs-up']"
                fade
                class="ms-1"
                style="color: #009856"
            /></span>
            <router-link to="/product" class="lihat-semua"
              >Lihat Semua
              <font-awesome-icon icon="fa-solid fa-arrow-right" class="mx-2"
            /></router-link>
          </div>
          <div class="card-content">
            <div class="row-container">
              <div
                class="card-row"
                v-for="product in products"
                :key="product.id"
              >
                <card-product-component :product="product" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

import { BASE_URL } from "@/config";
import apis from "@/apis";
import CardProductComponent from "@/components/CardProductComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
export default {
  name: "HomeView",
  components: { CardProductComponent, NavbarComponent },
  metaInfo() {
    return {
      title: "Gadgetshop",
    };
  },

  data() {
    return {
      categories: [],
      products: [],
      categoryId: null,
      BASE_URL,
    };
  },
  created() {
    this.getCategories();
    this.getProduct();
    this.categoryId = this.$route.params.id;
  },
  methods: {
    async getCategories() {
      try {
        const response = await apis.apis.post(apis.PublicPath + "/kategori");
        this.categories = response.data;
        this.categories.sort((a, b) =>
          a.nama_kategori.localeCompare(b.nama_kategori)
        );
      } catch (error) {
        // console.error(error);
      }
    },
    async getProduct() {
      try {
        const response = await apis.apis.post(apis.PublicPath + "/produk");
        const sortedProducts = response.data.sort(
          (a, b) => b.terjual - a.terjual
        );
        // const availableProducts = sortedProducts.filter(
        //   (product) => product.stok > 0
        // );
        this.products = sortedProducts.slice(0, 5);
      } catch (error) {
        // console.error(error);
      }
    },
  },
  computed: {
    filteredProducts() {
      if (!this.categoriId) {
        return this.products;
      }
      return this.products.filter(
        (product) => product.categoriId === parseInt(this.categoriId)
      );
    },
  },
};
</script>
<style></style>
