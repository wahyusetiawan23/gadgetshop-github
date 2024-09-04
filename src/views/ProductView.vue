<template>
  <div class="product">
    <navbar-component />
    <section class="content-product">
      <div class="container">
        <div class="product-page">
          <h5 class="judul-page">PRODUK</h5>
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
              <div class="col-md-3 col-kategori">
                <div
                  class="category-option sticky-top"
                  v-bind:style="{ display: categoryShown ? 'block' : '' }"
                  transition="category-option"
                >
                  <div class="select-kategori">
                    {{
                      selectedcategory
                        ? "Kategori: " + selectedcategory.nama_kategori
                        : "Semua Produk"
                    }}
                  </div>
                  <div class="btn-back-category">
                    <a class="btn-back" @click="toggleCategory"
                      ><font-awesome-icon icon="fa-solid fa-arrow-left" />
                      <span class="px-2">Close</span></a
                    >
                  </div>
                  <div class="header-category">Kategori</div>
                  <div class="card-categori">
                    <div
                      class="item-menu"
                      v-for="category in categories"
                      :key="category.id_kategori"
                    >
                      <a
                        :href="category.id_kategori"
                        @click="toggleCategory"
                        @click.prevent="
                          toggleActiveCategory(category.id_kategori);
                          filterBycategory(
                            category.id_kategori,
                            category.nama_kategori
                          );
                        "
                        :class="
                          activeCategory == category.id_kategori ? 'active' : ''
                        "
                        ><span
                          ><font-awesome-icon
                            :icon="['fas', 'thumbs-up']"
                            class="icon"
                          />{{ category.nama_kategori }}</span
                        ><span>
                          <font-awesome-icon
                            icon="fa-solid fa-chevron-right " /></span
                      ></a>
                    </div>
                  </div>
                </div>
                <div class="filter-button" transition="category-option">
                  <div class="select-kategori-show">
                    {{
                      selectedcategory
                        ? "Kategori: " + selectedcategory.nama_kategori
                        : "Semua Produk"
                    }}
                  </div>
                  <button
                    class="danger-button danger-center btn btn-sm filter-btn"
                    @click="toggleCategory"
                  >
                    <font-awesome-icon icon="fa-solid fa-align-left" /><span
                      class="ms-2"
                      >Filter</span
                    >
                  </button>
                </div>
              </div>
              <div class="col-md-9 col-card-product">
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
                <div
                  v-if="showResults"
                  class="card-content card-content-all mt-3"
                >
                  <div class="row-containerr">
                    <div
                      class="product-card"
                      v-for="product in products"
                      :key="product.id"
                    >
                      <card-product-component :product="product" />
                    </div>
                  </div>
                </div>
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
                <div class="btn-load-more" v-if="btn">
                  <button
                    class="btn btn-success"
                    v-if="selectedcategory"
                    @click.prevent="showAllProducts()"
                  >
                    Lihat Semua Produk
                  </button>
                  <button
                    class="btn btn-success"
                    v-else-if="
                      products.length >= productsPerLoad &&
                      products.length < totalProducts
                    "
                    @click.prevent="loadMoreProducts()"
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
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import CardProductComponent from "@/components/CardProductComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import apis from "@/apis";
export default {
  name: "ProductView",
  components: { CardProductComponent, NavbarComponent },
  metaInfo() {
    return {
      title: "Produk Gagdetshop",
    };
  },

  data() {
    return {
      products: [],
      categories: [],
      selectedcategory: null,
      search: "",
      totalProducts: 0,
      categoryShown: false,
      subKategori: [],
      loading: false,
      showResults: false,
      not: false,
      activeCategory: null,
      isScrolled: false,
      btn: true,
      productsPerLoad: 20,
    };
  },
  created() {
    this.getCategories();
    this.getProducts();
  },
  // computed: {
  //   reverseProductList() {
  //     return this.products.slice().reverse();
  //   },
  // },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    toggleActiveCategory(categoryId) {
      this.activeCategory = categoryId;
    },
    toggleCategory() {
      this.categoryShown = !this.categoryShown;
    },
    setProducts(data) {
      this.products = data.slice(0, this.productsPerLoad);
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
    searchProduct() {
      apis.apis
        .post(apis.PublicPath + "/produk")
        .then((response) => {
          const filteredProducts = response.data.filter((p) =>
            p.nama_produk.toLowerCase().includes(this.search.toLowerCase())
          );

          if (filteredProducts.length == 0) {
            this.not = true;
            this.showResults = false;
            this.btn = false;
          } else {
            this.btn = true;
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
          this.btn = true;
        });
    },

    async filterBycategory(categoryId, categoryName) {
      try {
        let data = {
          kategori: categoryId,
        };
        const response = await apis.apis.post(
          apis.PublicPath + "/filter_produk",
          data,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        this.products = response.data.slice(0, this.productsPerLoad);
        this.not = false;
        this.selectedcategory = {
          id_kategori: categoryId,
          nama_kategori: categoryName,
        };
      } catch (error) {
        // console.error(error);
        this.products = [];
        this.not = true;
        this.selectedcategory = {
          id_kategori: categoryId,
          nama_kategori: categoryName,
        };
      }
    },

    async getProducts() {
      try {
        const response = await apis.apis.post(apis.PublicPath + "/produk");
        this.products = response.data.slice(0, this.productsPerLoad);
        this.totalProducts = response.data.length;
        this.showResults = true;
      } catch (error) {
        // console.log(error);
      }
    },
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
          const response = await apis.apis.post(apis.PublicPath + "/produk");
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
      this.not = false;
      this.activeCategory = null;
    },
  },
};
</script>
<style></style>
