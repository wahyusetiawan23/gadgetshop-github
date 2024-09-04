<template>
  <div>
    <div class="card">
      <img
        v-img
        :src="`${BASE_URL}produk/${product.foto_1}`"
        class="card-img-top image"
        alt="..."
        loading="lazy"
      />
      <div class="card-body">
        <router-link :to="'/detail/' + product.id_g_produk">
          <h5
            class="card-title"
            id="myText"
            v-b-tooltip.hover="product.nama_produk"
          >
            {{ product.nama_produk }}
          </h5>
          <div class="harga">
            <h5>
              {{
                Number(product.harga_jual).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
              }}
            </h5>
            <div class="row">
              <div class="col-md-4 col-4 rating">
                <font-awesome-icon icon="fa-solid fa-star" /><span
                  class="px-1"
                  >{{ product.grade }}</span
                >
              </div>
              <div class="col-md-8 col-8 rating d-flex justify-content-end">
                <font-awesome-icon icon="fa-solid fa-bag-shopping" /><span
                  class="px-1"
                  >{{ formattedSold }} Terjual</span
                >
              </div>
            </div>
          </div>
        </router-link>
        <a
          class="btn btn-cart btn-secondary add-to-cart-button disabled"
          v-if="product.stok == 0"
          ><font-awesome-icon icon="fa-solid fa-cart-plus" />STOK HABIS</a
        >
        <a
          class="btn btn-cart btn-success add-to-cart-button"
          v-else
          @click="addToCart(product)"
          ><font-awesome-icon
            icon="fa-solid fa-cart-plus"
            :disabled="isButtonDisabled"
          />Keranjang</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from "@/config";
import router from "@/router";
import apis from "@/apis";
export default {
  name: "CardProductComponent",
  props: ["product"],
  data() {
    return {
      cart: [],
      products: [],
      wishlistCount: 0,
      quantity: 1,
      wishlist: [],
      BASE_URL,
      isButtonDisabled: false,
    };
  },
  computed: {
    formattedSold() {
      const number = this.product.terjual;
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
  },
  methods: {
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
  },
};
</script>

<style></style>
