<template>
  <div class="cart">
    <NavbarComponent />
    <section class="content-keranjang">
      <div class="container">
        <h5 class="title-cart">KERANJANG</h5>
        <div v-if="cartItems.length === 0">
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

        <div v-else class="row content-page-keranjang">
          <div class="col-md-8">
            <div class="header-keranjang">
              <span>
                <input
                  class="form-check-input"
                  v-model="selectAllItemsSelected"
                  type="checkbox"
                  name="all"
                  @change="toggleAllItemsSelected"
                /><span class="px-2">Pilih Semua</span></span
              >
              <a
                class="btn btn-sm btn-primary"
                id="btn-hapus"
                v-if="selectAllItemsSelected"
                @click="deleteAllProducts(item)"
              >
                <font-awesome-icon icon="fa-solid fa-trash-can" />Hapus
              </a>
            </div>
            <div class="list-keranjang">
              <div
                class="item-cart"
                v-for="item in reversedCartList"
                :key="item.id"
              >
                <div class="row list-item-cart mb-3">
                  <div class="col-md-1 col-1">
                    <input
                      class="form-check-input checkSingle"
                      type="checkbox"
                      :value="item"
                      v-model="itemSelected"
                    />
                  </div>
                  <div class="col-md-2 col-5">
                    <img
                      :src="`${BASE_URL}produk/${item.foto_1}`"
                      :disabled="item.stok == 0"
                      alt=""
                    />
                  </div>
                  <div class="col-md-5 col-6">
                    <span class="badge text-bg-danger" v-if="item.stok == 0"
                      ><font-awesome-icon
                        :icon="['fas', 'circle-info']"
                        beat-fade
                        style="color: #ffffff"
                        class="me-1"
                      />
                      STOK HABIS</span
                    >
                    <p class="namaProduk">{{ item.nama_produk }}</p>
                    <p class="pcs">
                      Harga /pcs :{{
                        Number(item.harga_jual).toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })
                      }}
                    </p>
                    <p class="note">Stok :{{ item.stok }}</p>
                    <p class="note">Berat :{{ item.berat * item.qty }} gram</p>
                  </div>
                  <div
                    class="col-md-4 text-end d-flex justify-content-end align-items-end"
                  >
                    <div>
                      <span class="harga"
                        >Total :{{
                          (item.harga_jual * item.qty).toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })
                        }}</span
                      >
                      <div>
                        <a
                          class="btn btn-danger btn-sm mt-2 me-2"
                          @click="hapusItemCart(item.idcart)"
                          ><font-awesome-icon icon="fa-solid fa-trash-can"
                        /></a>
                        <div
                          class="btn-group btn-group-sm mt-2"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            :disabled="item.qty == 1"
                            type="button"
                            class="btn btn-success minus"
                            @click="decreaseQuantity(item)"
                          >
                            <font-awesome-icon icon="fa-solid fa-minus" />
                          </button>
                          <input
                            class="form-control quantity"
                            v-model="item.qty"
                            @input="handleChangeInput(item)"
                          />
                          <button
                            :disabled="Number(item.qty) >= Number(item.stok)"
                            type="button"
                            class="btn btn-success plus"
                            @click="increaseQuantity(item)"
                          >
                            <font-awesome-icon icon="fa-solid fa-plus" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="total-belanja">
              <div class="total-price">
                <span class="title">Total Harga</span>
                <span class="harga">{{
                  totalPrice.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                }}</span>
              </div>
              <div class="mt-3">
                <a class="btn btn-success" @click="checkout(cartItems)"
                  >CHECKOUT</a
                >
                <router-link to="/product" class="btn btn-outline-success"
                  >Lanjut Berbelanja</router-link
                >
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
import NavbarComponent from "@/components/NavbarComponent.vue";
import Swal from "sweetalert2";
export default {
  name: "CartView",
  components: { NavbarComponent },
  beforeRouteLeave(to, from, next) {
    if (to.path === from.path) {
      next(false);
    } else {
      next();
    }
  },
  metaInfo() {
    return {
      title: "Keranjang anda di Gadgetshop",
    };
  },
  data() {
    return {
      isChecked: false,
      item: [],
      cartItems: [],
      qty: {},
      itemSelected: [],
      totalPrice: 0,
      selectAllItemsSelected: false,
      BASE_URL,
    };
  },
  computed: {
    reversedCartList() {
      return this.cartItems.slice().reverse();
    },
  },
  created() {
    var token = sessionStorage.getItem("trash");
    apis.apis
      .post(apis.ContentPath + "/cartUser", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        this.cartItems = response.data;
      })
      .catch((error) => {
        // console.error(error);
        error;
      });
  },
  methods: {
    increaseQuantity(item) {
      if (Number(item.qty) < Number(item.stok)) {
        item.qty++;
      }
    },
    decreaseQuantity(item) {
      if (item.qty > 1) {
        item.qty--;
      }
    },
    updateTotalPrice() {
      this.totalPrice = this.itemSelected.reduce((total, item) => {
        if (this.itemSelected.includes(item)) {
          return total + item.harga_jual * item.qty;
        }
      }, 0);
    },
    toggleAllItemsSelected(event) {
      if (event.target.checked) {
        this.itemSelected = this.cartItems.slice();
        this.selectAllItemsSelected = true;
      } else {
        this.itemSelected = [];
        this.selectAllItemsSelected = false;
      }
      this.updateTotalPrice();
    },
    // toggleItemSelected(itemId) {
    //   const index = this.itemSelected.indexOf(itemId);
    //   if (index !== -1) {
    //     this.itemSelected.splice(index, 1);

    //   } else {
    //     this.itemSelected.push(itemId);
    //   }
    //   this.updateTotalPrice();
    // },

    handleChangeInput(item) {
      const newValue = item.qty.replace(/\D/g, "");
      const maxValue = item.stok;
      const minValue = 1;
      if (newValue !== item.qty) {
        item.qty = newValue;
      }
      const limitedValue = Math.min(Math.max(newValue, minValue), maxValue);
      item.qty = limitedValue;
    },
    hapusItemCart(idcart) {
      const token = sessionStorage.getItem("trash");
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Anda akan menghapus item produk keranjang Anda",
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
            idcart: idcart,
          };
          apis.apis
            .post(apis.ContentPath + "/cartById", postData, {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            })
            .then((response) => {
              this.$toast.success("Produk berhasil dihapus dari keranjang", {
                timeout: 2000,
              });
              setTimeout(() => {
                const index = this.cartItems.findIndex(
                  (item) => item.idcart === idcart
                );
                this.cartItems.splice(index, 1);
                this.$toast.dismiss();
                EventBus.$emit("cartDelete");
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
    async deleteAllProducts() {
      try {
        const token = sessionStorage.getItem("trash");
        const result = await Swal.fire({
          title: "Apakah Anda yakin?",
          text: "Anda akan menghapus item produk keranjang Anda",
          icon: "warning",
          iconColor: "#bf3c3c",
          color: "#fff",
          background: " #00000080",
          showCancelButton: true,
          confirmButtonColor: "#bf3c3c",
          confirmButtonText: "Ya, hapus!",
          cancelButtonText: "Tidak",
        });
        if (result.isConfirmed) {
          var array = this.itemSelected;
          var dataArray = [];
          array.forEach(function (element) {
            dataArray.push(element.idcart);
          });
          var postData = {
            dataArray: dataArray,
          };

          const response = await apis.apis.post(
            apis.ContentPath + "/cartByList",
            postData,
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          if (response.data) {
            this.$toast.success(
              "Semua item produk berhasil dihapus dari keranjang!",
              {
                timeout: 2000,
              }
            );
            setTimeout(() => {
              this.$toast.dismiss();
              EventBus.$emit("cartDelete");

              this.cartItems = [];
              this.itemSelected = [];
            }, 2000);
          }
        }
      } catch (error) {
        // console.log(error);
      }
    },

    async checkout(cartItems) {
      let error = false;
      for (let i = 0; i < this.itemSelected.length; i++) {
        if (isNaN(cartItems[i].qty) || this.itemSelected[i].qty <= 0) {
          error = true;
          this.$toast.error("Jumlah kuantitas produk minimal 1", {
            timeout: 2000,
          });
          setTimeout(() => {
            this.$toast.dismiss();
          }, 2000);
          break;
        }

        if (
          Number(this.itemSelected[i].qty) > Number(this.itemSelected[i].stok)
        ) {
          error = true;
          this.$toast.error(
            "Jumlah produk yang diminta melebihi stok yang tersedia",
            {
              timeout: 2000,
            }
          );
          setTimeout(() => {
            this.$toast.dismiss();
          }, 2000);
          break;
        }
      }

      if (!error) {
        if (this.itemSelected.length === 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            color: "#fff",
            text: "Silakan pilih produk yang ingin dibeli",
            confirmButtonColor: "#00985b",
            background: " #00000080",
            width: "24em",
            toast: "true",
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          return;
        }
        const token = sessionStorage.getItem("trash");

        var array = this.itemSelected;
        var dataArray = [];
        var qtyArray = [];
        array.forEach(function (element) {
          dataArray.push(element.idcart);
          qtyArray.push(element.qty);
        });
        var postData = {
          dataArray: dataArray,
          qtyArray: qtyArray,
        };
        try {
          const response = await apis.apis.post(
            apis.ContentPath + "/addressByUser",
            null,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );

          this.notfound = false;
          this.alamatList = response.data;
          this.alamatList.sort((a, b) => {
            if (a.parent == 1 && b.parent != 1) {
              return -1;
            } else if (a.parent != 1 && b.parent == 1) {
              return 1;
            } else {
              return 0;
            }
          });

          if (response.data) {
            const response2 = await apis.apis.post(
              apis.ContentPath + "/cartArr",
              postData,
              {
                headers: {
                  Authorization: "Bearer " + token,
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            );

            if (response2.data) {
              this.$toast.success("Silahkan pilih metode pengiriman!", {
                timeout: 2000,
              });
              setTimeout(() => {
                this.$toast.dismiss();
                if (this.$router.currentRoute.path !== "/detail-bayar") {
                  this.$router.push("/detail-bayar");
                }
              }, 2000);
            }
          }
        } catch (error) {
          // console.error(error);
          this.$toast.error(
            "Silahkan tambahkan alamat untuk melakukan proses checkout!",
            {
              timeout: 2500,
            }
          );
          setTimeout(() => {
            this.$toast.dismiss();
            if (this.$router.currentRoute.path !== "/alamat") {
              this.$router.push("/alamat");
            }
          }, 2000);
        }
      }
    },
  },
  watch: {
    itemSelected: {
      handler() {
        this.selectAllItemsSelected =
          this.itemSelected.length === this.cartItems.length;

        this.updateTotalPrice();
      },
      deep: true,
    },
  },
};
</script>

<style>
.row-containerr {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}
</style>
