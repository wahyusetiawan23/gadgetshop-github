<template>
  <div class="product-kategori">
    <navbar-component />
    <section class="content-product">
      <div class="container">
        <div class="product-page">
          <h5 class="judul-page">PRODUK KATEGORI</h5>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/">Home</router-link>
              </li>
              <li class="breadcrumb-item" aria-current="page">
                {{ $route.name }}
              </li>
            </ol>
          </nav>

          <div class="content-product">
            <div class="row">
              <div class="input-group xx mb-3 sticky-top">
                <input
                  v-model="search"
                  type="text"
                  :class="{ 'fc-search': isScrolled }"
                  class="form-control"
                  placeholder="Cari Produk .."
                  aria-label="Cari"
                  aria-describedby="basic-addon1"
                  @keyup="delayedSearch"
                />
                <div class="input-group-prepend">
                  <span
                    class="input-group-text"
                    :class="{ 'fc-group': isScrolled }"
                    id="basic-addon1"
                  >
                    <b-icon-search></b-icon-search>
                  </span>
                </div>
              </div>
              <div v-if="loading" class="text-center mt-3">
                <div class="loading-spinner"></div>
              </div>
              <div class="col-md-12 col-card-product">
                <div class="row d-flex justify-content-center">
                  <div class="col-md-6">
                    <div v-if="not">
                      <div class="content-error">
                        <div class="img-error">
                          <img
                            src="../assets/img/notfound.png"
                            alt="result not found"
                          />
                        </div>
                        <div class="desk-error">
                          <div class="title-error">
                            Oops, produk nggak ditemukan
                          </div>
                          <span class="desc-error"
                            >Coba cari produk lainnya....
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-content card-content-all">
                  <div class="row-containerss">
                    <div
                      class="product-card"
                      v-for="product in products"
                      :key="product.id"
                    >
                      <card-product-component :product="product" />
                    </div>
                  </div>
                  <div class="btn-load-more" v-if="btn">
                    <button
                      class="btn btn-success"
                      v-if="
                        products.length >= productsPerLoad &&
                        products.length < totalProducts
                      "
                      @click.prevent="loadMoreProducts()"
                      :disabled="products.length >= totalProducts"
                    >
                      Tampilkan Lebih Banyak
                    </button>
                    <button class="btn btn-success" v-else disabled>
                      Tidak Ada Produk Lain
                    </button>
                  </div>
                </div>
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
import apis from "@/apis";
import CardProductComponent from "@/components/CardProductComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
export default {
  name: "ProductKategoriView",
  components: { CardProductComponent, NavbarComponent },
  metaInfo() {
    return {
      title: "Produk Gagdetshop",
    };
  },

  data() {
    return {
      products: {},
      not: false,
      search: "",
      loading: false,
      isScrolled: false,
      btn: true,
      totalProducts: 0,
      productsPerLoad: 20,
    };
  },

  created() {
    this.getProducts();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    delayedSearch() {
      if (this.searchTimeout) {
        this.products = [];
        this.not = false;
        this.loading = true;
        this.btn = false;
        clearTimeout(this.searchTimeout);
      }

      this.searchTimeout = setTimeout(() => {
        this.searchProduct();
      }, 1000);
    },
    setProducts(data) {
      this.products = data;
    },
    searchProduct() {
      this.loading = true;
      this.products = [];
      this.not = false;
      setTimeout(() => {
        const kategoriId = this.$route.params.id;
        apis.apis
          .post(
            apis.PublicPath + "/filter_produk",
            {
              kategori: kategoriId,
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then((response) => {
            const filteredProducts = response.data.filter((p) =>
              p.nama_produk.toLowerCase().includes(this.search.toLowerCase())
            );
            if (filteredProducts.length === 0) {
              this.not = true;
            } else {
              this.not = false;
              this.setProducts(filteredProducts);
              this.showResults = true;
            }
          })
          .catch((error) => {
            this.errorMessage =
              "Terjadi kesalahan saat memuat data. Silakan coba lagi nanti.";
            // console.log(error);
            error;
          })
          .finally(() => {
            this.loading = false;
          });
      }, 2000);
    },
    async getProducts() {
      try {
        const kategoriId = this.$route.params.id;
        const response = await apis.apis.post(
          apis.PublicPath + "/filter_produk",
          {
            kategori: kategoriId,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        this.products = response.data.slice(0, this.productsPerLoad);
        this.totalProducts = response.data.length;
        this.not = false;
      } catch (error) {
        // console.error(error);
        this.products = [];
        this.not = true;
      }
    },
    async loadMoreProducts() {
      const remainingProducts = this.totalProducts - this.products.length;
      const additionalProductsCount = Math.min(
        this.productsPerLoad,
        remainingProducts
      );

      if (additionalProductsCount > 0) {
        const startIndex = this.products.length;
        const endIndex = startIndex + additionalProductsCount;

        try {
          const kategoriId = this.$route.params.id;
          const response = await apis.apis.post(
            apis.PublicPath + "/filter_produk",
            {
              kategori: kategoriId,
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          const additionalProducts = response.data.slice(startIndex, endIndex);

          this.products = [...this.products, ...additionalProducts];
        } catch (error) {
          // console.log(error);
        }
      }
    },

    showAllProducts() {
      this.selectedcategory = null;
      this.getProducts();
    },
  },
};
</script>
<style></style>
