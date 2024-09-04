<template>
  <div class="detail">
    <navbar-component />
    <section class="content-details">
      <div class="container">
        <div class="details-page">
          <h5 class="judul-detail">DETAIL PRODUK</h5>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/product">Produk</router-link>
              </li>
              <li class="breadcrumb-item" aria-current="page">
                {{ $route.name }}
              </li>
            </ol>
          </nav>
          <div class="content-page-details">
            <div class="row">
              <div class="col-md-5 text-center">
                <img v-img :src="bigImage" class="big" alt="" />
                <div class="row thumbnail">
                  <div
                    v-for="(foto, index) in fotos"
                    :key="index"
                    class="col-md-3"
                  >
                    <img
                      v-if="foto !== 'img_produk.png'"
                      :src="`${BASE_URL}/produk/${foto}`"
                      class="thumb"
                      alt=""
                      @click="changeBigImage(index)"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-7">
                <div class="title">
                  <p>{{ product.nama_produk }}</p>
                </div>
                <div class="rating">
                  <span
                    ><font-awesome-icon
                      icon="fa-solid fa-star"
                      class="me-2"
                    />{{ product.grade }}</span
                  >

                  <span>|</span>
                  <span>{{ product.terjual }} Terjual</span>
                </div>
                <div class="harga">
                  <div class="c-harga d-flex align-items-center">
                    <div class="r-harga">
                      {{
                        product.harga_jual
                          ? (product.harga_jual * quantity).toLocaleString(
                              "id-ID",
                              { style: "currency", currency: "IDR" }
                            )
                          : ""
                      }}
                    </div>
                  </div>
                </div>
                <div class="form-detail">
                  <table class="table table-borderless">
                    <tbody>
                      <tr>
                        <th>Berat</th>
                        <td>{{ product.berat }} gram</td>
                      </tr>
                      <tr>
                        <th>Stok</th>
                        <td>{{ product.stok }}</td>
                      </tr>
                      <tr>
                        <th>Kuantitas</th>
                        <td class="d-flex">
                          <div
                            class="btn-group btn-group-sm"
                            role="group"
                            aria-label="Basic example"
                          >
                            <button
                              :disabled="quantity == 1"
                              type="button"
                              class="btn btn-success minus"
                              @click="decreaseQuantity"
                            >
                              <font-awesome-icon icon="fa-solid fa-minus" />
                            </button>
                            <input
                              class="form-control quantity"
                              v-model.number="quantity"
                              @input="handleChangeInput"
                            />
                            <button
                              :disabled="quantity >= product.stok"
                              type="button"
                              class="btn btn-success plus"
                              @click="increaseQuantity"
                            >
                              <font-awesome-icon icon="fa-solid fa-plus" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="btn-details">
                    <div class="row">
                      <div class="col-md-6">
                        <button
                          href="#"
                          class="btn btn-outline-danger add-to-wishlist"
                          @click="addToWishlist(product)"
                          v-if="product.wishlist"
                        >
                          <font-awesome-icon
                            icon="fa-solid fa-heart"
                            class="me-2"
                          />Hapus Wishlist
                        </button>
                        <button
                          href="#"
                          class="btn btn-outline-success add-to-wishlist"
                          @click="addToWishlist(product)"
                          v-else
                        >
                          <font-awesome-icon
                            icon="fa-solid fa-heart"
                            class="me-2"
                          />Masukkan Wishlist
                        </button>
                      </div>
                      <div class="col-md-6">
                        <button
                          href="#"
                          class="btn btn-secondary add-to-cart-button disabled"
                          v-if="product.stok == 0"
                        >
                          <font-awesome-icon
                            icon="fa-solid fa-cart-plus"
                            class="me-2"
                          />STOK HABIS
                        </button>
                        <button
                          href="#"
                          class="btn btn-success add-to-cart-button"
                          v-else
                          @click="addToCart(product)"
                        >
                          <font-awesome-icon
                            icon="fa-solid fa-cart-plus"
                            class="me-2"
                          />Masukkan Keranjang
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="content-desc-details">
                    <div class="bg-desc-details">
                      <span>Deskripsi Produk</span>
                    </div>
                    <div class="content" v-if="product.deskripsi == null">
                      Tidak ada deskripsi
                    </div>

                    <div
                      class="content"
                      :style="{
                        '-webkit-line-clamp': isCollapsed ? 'unset' : '17',
                        '-webkit-box-orient': isCollapsed
                          ? 'unset'
                          : 'vertical',
                      }"
                      v-html="formattedString"
                      v-else
                    ></div>
                    <a
                      v-if="
                        product.deskripsi != null &&
                        formattedString.split('<br>').length >= 17
                      "
                      href="#"
                      @click="toggleCollapse($event)"
                      class="detail-show"
                      >{{
                        isCollapsed ? "Sembunyikan" : "Lihat Selengkapnya.."
                      }}</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="btn-more-view d-flex justify-content-end mt-3 mb-3">
            <router-link to="/product" class="btn btn-warning"
              >Produk Lainnya
              <font-awesome-icon
                :icon="['fas', 'arrow-right']"
                beat-fade
                class="ms-2"
            /></router-link>
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
import router from "@/router";
import NavbarComponent from "@/components/NavbarComponent.vue";
import { EventBus } from "@/event-bus.js";
export default {
  components: { NavbarComponent },
  name: "ProductDetailView",
  metaInfo() {
    return {
      title: "Detail produk Gagdetshop",
    };
  },

  data() {
    return {
      maxLength: 200,
      showMore: false,
      product: {},
      bigImage: "",
      quantity: 1,
      BASE_URL,
      fotos: [],
      myString: "",
      isCollapsed: false,
    };
  },
  computed: {
    formattedString() {
      return this.myString.replace(/\n/g, "<br>");
    },
  },
  async created() {
    const token = sessionStorage.getItem("trash");
    let headers = {};
    if (token) {
      headers.Authorization = "Bearer " + token;
    }
    try {
      const id = this.$route.params.id;
      let data = {
        produk: id,
      };
      const response = await apis.apis.post(
        apis.PublicPath + "/detail_produk",
        data,
        {
          headers: {
            ...headers,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      this.product = response.data;
      this.myString = response.data.deskripsi;
      this.fotos = [
        this.product.foto_1,
        this.product.foto_2,
        this.product.foto_3,
        this.product.foto_4,
      ];
      this.bigImage = `${BASE_URL}produk/${this.product.foto_1}`;
      this.quantity = 1;
    } catch (error) {
      // console.log(error);
    }
  },

  methods: {
    toggleCollapse(event) {
      event.preventDefault();
      this.isCollapsed = !this.isCollapsed;
    },
    changeBigImage(index) {
      this.bigImage = `${BASE_URL}/produk/${this.fotos[index]}`;
    },
    increaseQuantity() {
      if (this.quantity < this.product.stok) {
        this.quantity++;
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    handleChangeInput(event) {
      const inputValue = event.target.value;
      const maxValue = this.product.stok;
      const minValue = 1;

      const newValue = Math.min(Math.max(inputValue, minValue), maxValue);

      this.quantity = newValue;
    },
    async addToCart(product) {
      const token = sessionStorage.getItem("trash");
      if (!token) {
        this.$toast.info("Anda harus login dulu", {
          timeout: 1500,
        });
        setTimeout(() => {
          this.$toast.dismiss();
          router.push("/login");
        }, 1500);
        return;
      }
      if (isNaN(this.quantity) || this.quantity <= 0) {
        this.$toast.error("Jumlah kuantitas produk minimal 1", {
          timeout: 2000,
        });
        setTimeout(() => {
          this.$toast.dismiss();
          this.quantity = 1;
        }, 2000);
        return;
      }
      if (this.quantity > parseInt(product.stok)) {
        this.$toast.error(
          "Jumlah produk yang diminta melebihi stok yang tersedia",
          {
            timeout: 2000,
          }
        );
        setTimeout(() => {
          this.$toast.dismiss();
          this.quantity = 1;
        }, 2000);
        return;
      }
      var postData = {
        produk: product.id_g_produk,
        qty: this.quantity,
      };
      try {
        const response = await apis.apis.post(
          apis.ContentPath + "/cart",
          postData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        if (response.data == "failed") {
          this.$toast.error(
            "Dikeranjang belanja anda sudah ada produk yang sama, setelah dijumlahkan melebihi stok yang tersedia",
            {
              timeout: 3000,
            }
          );
          setTimeout(() => {
            this.$toast.dismiss();
            response;
          }, 2000);
        } else {
          this.$toast.success("Produk berhasil ditambahkan kedalam keranjang", {
            timeout: 2000,
          });
          setTimeout(() => {
            this.$toast.dismiss();
            response;
            EventBus.$emit("cartUpdated");
          }, 2000);
        }
      } catch (error) {
        // console.error(error);
      }
    },
    addToWishlist(product) {
      const token = sessionStorage.getItem("trash");
      if (!token) {
        this.$toast.info("Anda harus login dulu", {
          timeout: 1500,
        });
        setTimeout(() => {
          this.$toast.dismiss();
          router.push("/login");
        }, 1500);
        return;
      }
      var postData = {
        produk: product.id_g_produk,
      };
      apis.apis
        .post(apis.ContentPath + "/wishlist", postData, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          if (response.data == "delete") {
            this.$toast.info("Produk berhasil dihapus dari wishlist", {
              timeout: 2000,
            });
            setTimeout(() => {
              this.$toast.dismiss();
              location.reload();
              response;
              EventBus.$emit("wishlistDelete");
            }, 2000);
          } else {
            this.$toast.success(
              "Produk berhasil ditambahkan kedalam wishlist",
              {
                timeout: 2000,
              }
            );
            setTimeout(() => {
              this.$toast.dismiss();
              location.reload();
              response;
              EventBus.$emit("wishlistUpdated");
            }, 2000);
          }
        })
        .catch((error) => {
          // console.error(error);
          error;
        });
    },
  },
};
</script>
<style></style>
