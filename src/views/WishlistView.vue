<template>
  <div class="wishlist">
    <navbar-component />
    <section class="content-wishlist">
      <div class="container">
        <h5 class="title">WISHLIST</h5>
        <div v-if="wishlist.length === 0">
          <div class="empty-wishlist">
            <div class="row">
              <div class="col-md-3">
                <img src="../assets/img/empty.png" alt="" />
              </div>
            </div>
          </div>
          <div class="empty-wishliss mt-3 text-center">
            <router-link to="/product">
              <button class="btn btn-wishliss btn-success">
                Mulai berbelanja
              </button>
            </router-link>
          </div>
        </div>
        <div v-else class="card-content ss">
          <div class="row-container">
            <div class="product-card" v-for="item in wishlist" :key="item.id">
              <div class="card">
                <img
                  v-img
                  :src="`${BASE_URL}produk/${item.foto_1}`"
                  class="card-img-top image"
                  alt="..."
                />
                <div class="card-body">
                  <router-link :to="'/detail/' + item.id_g_produk">
                    <h5
                      class="card-title"
                      id="myText"
                      data-toggle="tooltip"
                      data-placement="top"
                      :title="item.nama_produk"
                    >
                      {{ item.nama_produk }}
                    </h5>
                    <div class="harga">
                      <h5>
                        {{
                          Number(item.harga_jual).toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })
                        }}
                      </h5>
                      <div class="row">
                        <div class="col-md-6 col-5 rating">
                          <font-awesome-icon icon="fa-solid fa-star" /><span
                            class="px-1"
                            >{{ item.grade }}</span
                          >
                        </div>
                        <div
                          class="col-md-6 col-7 rating d-flex justify-content-end"
                        >
                          <font-awesome-icon
                            icon="fa-solid fa-bag-shopping"
                          /><span class="px-1"
                            >{{ formattedSold(item.terjual) }} Terjual</span
                          >
                        </div>
                      </div>
                    </div>
                  </router-link>
                  <div class="btn-wishlist">
                    <div class="row">
                      <div class="col-md-6 col-6">
                        <a
                          class="btn btn-success disabled"
                          v-if="item.stok == 0"
                          ><font-awesome-icon icon="fa-solid fa-cart-plus"
                        /></a>
                        <a
                          v-else
                          v-b-tooltip.hover="'Masukkan Keranjang'"
                          class="btn btn-success"
                          :disabled="isButtonDisabled"
                          @click="addToCart(item)"
                          id="add-to-cart-1"
                          ><font-awesome-icon icon="fa-solid fa-cart-plus"
                        /></a>
                      </div>
                      <div class="col-md-6 col-6">
                        <a
                          v-b-tooltip.hover="'Hapus Wishlist'"
                          class="btn btn-danger"
                          @click="removeProductFromWishlist(item.id_g_produk)"
                          ><font-awesome-icon icon="fa-solid fa-trash-can"
                        /></a>
                      </div>
                    </div>
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
import { BASE_URL } from "@/config";
import apis from "@/apis";
import { EventBus } from "@/event-bus";
import Swal from "sweetalert2";
import NavbarComponent from "@/components/NavbarComponent.vue";
import router from "@/router";
export default {
  components: { NavbarComponent },
  metaInfo() {
    return {
      title: "Wishlist anda di Gagdetshop",
    };
  },
  data() {
    return {
      BASE_URL,
      wishlist: [],
      quantity: 1,
      isButtonDisabled: false,
    };
  },
  created() {
    var token = sessionStorage.getItem("trash");
    apis.apis
      .post(apis.ContentPath + "/wishlistUser", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        this.wishlist = response.data;
      })
      .catch((error) => {
        // console.error(error);
        error;
      });
  },
  methods: {
    formattedSold(sold) {
      const number = sold;
      if (number >= 1000000000) {
        return (number / 1000000000).toFixed(0).replace(/\.0$/, "") + "M+";
      } else if (number >= 1000000) {
        return (number / 1000000).toFixed(0).replace(/\.0$/, "") + "jt+";
      } else if (number >= 10000) {
        return (number / 1000).toFixed(0).replace(/\.0$/, "") + "rb+";
      } else if (number >= 1000) {
        return (number / 1000).toFixed(1).replace(/\.0$/, "") + "rb+";
      } else {
        return number.toString();
      }
    },
    async addToCart(item) {
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
      if (this.quantity > parseInt(item.stok)) {
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
        produk: item.id_g_produk,
        qty: this.quantity,
      };
      try {
        this.isButtonDisabled = true;
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
            location.reload();
          }, 2000);
        }
      } catch (error) {
        // console.error(error);
      } finally {
        this.isButtonDisabled = false;
      }
    },

    removeProductFromWishlist(id_g_produk) {
      const token = sessionStorage.getItem("trash");
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Anda akan menghapus item produk dari wishlist Anda",
        icon: "warning",
        iconColor: "#bf3c3c",
        color: "#fff",
        background: " #00000080",
        showCancelButton: true,
        confirmButtonColor: "#bf3c3c",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Tidak",
      }).then((result) => {
        if (result.isConfirmed) {
          var postData = {
            produk: id_g_produk,
          };
          apis.apis
            .post(apis.ContentPath + "/wishlist", postData, {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            })
            .then((response) => {
              this.$toast.success("Produk berhasil dihapus dari wishlist", {
                timeout: 2000,
              });
              setTimeout(() => {
                const index = this.wishlist.findIndex(
                  (item) => item.id_g_produk === id_g_produk
                );
                this.wishlist.splice(index, 1);
                this.$toast.dismiss();
                EventBus.$emit("wishlistDelete");
                response;
              }, 2000);
            })
            .catch((error) => {
              // console.error(error);
              error;
            });
        }
      });
    },
  },
};
</script>
