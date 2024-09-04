<template>
  <div class="bayar">
    <navbar-component />
    <section class="content-pesanan">
      <div class="container">
        <h5 class="title">PESANAN</h5>
        <menu-pesanan-component />
        <div v-if="dataCheckout">
          <div class="empty-wishlist">
            <div class="row">
              <div class="col-md-3">
                <img src="../assets/img/nopesan.png" alt="" />
                <p
                  style="
                    margin-bottom: 0px;
                    margin-top: -20px;
                    text-align: center;
                    font-weight: 500;
                  "
                >
                  Tidak Ada Pesanan
                </p>
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
        <div>
          <div
            class="list-content-pesanan mt-2"
            v-for="checkout in reversedCartList"
            :key="checkout.id"
          >
            <div class="bg-header-pesan">
              <div>ID Transaksi: {{ checkout.id_payment }}</div>
              <div>
                <button
                  @click="detailBayar(checkout.id_payment)"
                  v-if="checkout.transaction_status !== null"
                  class="btn btn-md btn-primary"
                >
                  <font-awesome-icon
                    :icon="['fas', 'circle-info']"
                    class="me-1"
                  />
                  Bayar
                </button>
                <button
                  v-else
                  class="btn btn-md btn-success"
                  @click="submitForm(checkout.id_payment)"
                >
                  <font-awesome-icon
                    :icon="['fas', 'circle-check']"
                    beat-fade
                    class="me-1"
                  />
                  Bayar Sekarang
                </button>
              </div>
            </div>
            <div class="bg-produk-pesanan">
              <div
                class="row title-alamat"
                v-if="checkout.dropship_status != 0"
              >
                <div class="col-md-2">
                  <p>Dari:</p>
                </div>
                <div class="col-md-6 ss mb-1">
                  <p>
                    {{ checkout.nama_pengirim }}
                    {{ checkout.nomor_tlp }}
                  </p>
                </div>
              </div>
              <div class="row title-alamat">
                <div class="col-md-2 col-4">
                  <p>Dikirim Ke:</p>
                </div>
                <div class="col-md-6 col-8 ss mb-3">
                  <p>
                    {{ checkout.nama_penerima }}
                    {{ checkout.telepon }}
                  </p>
                  <p>
                    {{ checkout.alamat_lengkap }}, {{ checkout.kecamatan }},
                    {{ checkout.kabupaten }},
                    {{ checkout.provinsi }}
                  </p>
                  <p>{{ checkout.kode_pos }}</p>
                </div>
              </div>
              <div
                class="content-produk-pesanan"
                v-for="checkoutRe in getFilteredResults(checkout)"
                :key="checkoutRe.id"
              >
                <div>
                  <div class="list-pesanan kemas">
                    <div class="row mt-2">
                      <div class="col-md-2 col-4 text-center">
                        <img
                          :src="`${BASE_URL}produk/${checkoutRe.foto_1}`"
                          alt=""
                        />
                      </div>
                      <div class="col-md-6 col-8">
                        <div class="produk">
                          <p>{{ checkoutRe.nama_produk }}</p>
                          <p class="gram">{{ checkoutRe.berat }}gram</p>
                        </div>
                      </div>
                      <div class="col-md-2 text-end">
                        <span class="price-qty"
                          >{{
                            checkoutRe.harga.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })
                          }}
                          x {{ checkoutRe.qty }}</span
                        >
                      </div>
                      <div class="col-md-2 text-end">
                        <span class="price">{{
                          (checkoutRe.harga * checkoutRe.qty).toLocaleString(
                            "id-ID",
                            { style: "currency", currency: "IDR" }
                          )
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="total-pesanan">
                <div class="row">
                  <div class="col-md-12">
                    <div class="bg-total-pesanan">
                      <div class="row d-flex justify-content-end">
                        <div class="col-md-10 col-6 text-end">
                          <span class="title-total">
                            <span
                              >Ongkos Kirim
                              {{ checkout.kurir.toUpperCase() }} ({{
                                checkout.service
                              }}):</span
                            >
                          </span>
                        </div>
                        <div class="col-md-2 col-6 text-end">
                          <span class="total-harga">{{
                            Number(checkout.ongkir).toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })
                          }}</span>
                        </div>
                      </div>
                      <div class="row d-flex justify-content-end">
                        <div class="col-md-10 col-6 text-end">
                          <span class="title-total">Total Bayar:</span>
                        </div>
                        <div class="col-md-2 col-6 text-end">
                          <span class="total-harga">{{
                            Number(checkout.total).toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })
                          }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="btn-pesan-text">
                      <span class="batal"
                        ><font-awesome-icon
                          :icon="['fas', 'circle-exclamation']"
                          style="color: #ff0000"
                          class="mx-2"
                        /><a
                          class="batalkan"
                          @click="batalkanPesanan(checkout.id_payment)"
                        >
                          Batalkan Pesanan
                        </a></span
                      >
                      <p class="info-pesanan">
                        *Bayar sebelum : {{ checkout.date_expired }}
                      </p>
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
import NavbarComponent from "@/components/NavbarComponent.vue";
import Swal from "sweetalert2";
import MenuPesananComponent from "@/components/MenuPesananComponent.vue";
import apis from "@/apis";
import { BASE_URL } from "@/config";
export default {
  components: { NavbarComponent, MenuPesananComponent },
  metaInfo() {
    return {
      title: "Pembayaran Gadgetshop",
    };
  },
  data() {
    return {
      checkouts: [],
      item: [],
      checkoutsResults: {},
      BASE_URL,
      statusData: {},
      dataCheckout: false,
    };
  },
  computed: {
    reversedCartList() {
      return this.checkouts.slice().reverse();
    },
  },
  async created() {
    try {
      const token = sessionStorage.getItem("trash");
      const response = await apis.apis.post(
        apis.ContentPath + "/syncStatusPayment",
        null,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      this.dataResponse = response.data;
      await this.getDataPayment();
    } catch (error) {
      // console.error(error);
      this.dataCheckout = true;
    }
    if (!sessionStorage.getItem("trash")) {
      this.$router.push("/login");
      this.$toast.info("Anda harus login terlebih dahulu", {
        timeout: 2000,
      });
    }
  },
  methods: {
    getFilteredResults(checkout) {
      return this.checkoutsResults.filter(
        (checkoutRe) => checkoutRe.id_payment === checkout.id_payment
      );
    },

    async getDataPayment() {
      try {
        const token = sessionStorage.getItem("trash");
        const response = await apis.apis.post(
          apis.ContentPath + "/listPayment",
          null,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        this.checkouts = response.data.row;
        this.checkoutsResults = response.data.result;
      } catch (error) {
        // console.error(error);
        this.dataCheckout = true;
      }
    },
    async statusPayment(id) {
      try {
        const token = sessionStorage.getItem("trash");
        const response = await apis.apis.post(
          apis.ContentPath + "/statusPayment",
          {
            idpayment: id,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        this.statusData = response.data;
      } catch (error) {
        // console.error(error);
      }
    },
    midtrans() {
      var script = document.createElement("script");
      script.src = "https://app.midtrans.com/snap/snap.js";
      script.setAttribute("data-client-key", "Mid-client-kM9nYp9fgCpyMBNQ");
      script.async = true;
      document.head.appendChild(script);
    },
    async submitForm(id) {
      this.midtrans();
      try {
        var token = sessionStorage.getItem("trash");
        const response = await apis.apis.post(
          apis.ContentPath + "/paymentOrderCheck",
          {
            idpayment: id,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        this.token = response.data;
        this.idpay = id;
        window.snap.pay(response.data, {
          onSuccess: function (result) {
            result;
            location.reload();
          },
          onPending: function (result) {
            result;
            location.reload();
          },
          onError: function (result) {
            result;
            location.reload();
          },
          onClose: function () {},
        });
      } catch (error) {
        console.error("Error sending data to API:", error);
        const errorMessage = error.response.data.error.message;
        const startIndex =
          errorMessage.indexOf('"error_messages":["') +
          '"error_messages":["'.length;
        const endIndex = errorMessage.indexOf('"]}');
        const orderErrorMessage = errorMessage.substring(startIndex, endIndex);
        const mesage = orderErrorMessage.replace("transaction_details.", "");
        this.$toast.error(mesage, {
          timeout: 3000,
        });
      }
    },
    async detailBayar(id) {
      this.midtrans();
      try {
        var token = sessionStorage.getItem("trash");
        const response = await apis.apis.post(
          apis.ContentPath + "/paymentInfo",
          {
            idpayment: id,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        const dataToken = response.data.snap_token;

        window.snap.pay(dataToken, {
          onSuccess: function (result) {
            result;
          },
          onPending: function (result) {
            result;
          },
          onError: function (result) {
            result;
          },
          onClose: function () {},
        });
      } catch (error) {
        console.error("Error sending data to API:", error);
        const errorMessage = error.response.data.error.message;
        const startIndex =
          errorMessage.indexOf('"error_messages":["') +
          '"error_messages":["'.length;
        const endIndex = errorMessage.indexOf('"]}');
        const orderErrorMessage = errorMessage.substring(startIndex, endIndex);
        const mesage = orderErrorMessage.replace("transaction_details.", "");
        this.$toast.error(mesage, {
          timeout: 3000,
        });
      }
    },
    async batalkanPesanan(id) {
      try {
        const token = sessionStorage.getItem("trash");
        const result = await Swal.fire({
          title: "Apakah Anda yakin?",
          text: "Anda akan membatalkan pesananan Anda",
          icon: "warning",
          iconColor: "#bf3c3c",
          color: "#fff",
          background: " #00000080",
          showCancelButton: true,
          confirmButtonColor: "#bf3c3c",
          confirmButtonText: "Ya, batal!",
          cancelButtonText: "Tidak",
        });
        if (result.isConfirmed) {
          var postData = {
            idpayment: id,
          };

          const response = await apis.apis.post(
            apis.ContentPath + "/listPaymentDEL",
            postData,
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          if (response.data) {
            this.$toast.success("Pesanan berhasil di batalkan!", {
              timeout: 2000,
            });
            setTimeout(() => {
              this.$toast.dismiss();
              const index = this.checkouts.findIndex(
                (checkout) => checkout.id_payment == id
              );
              const indexx = this.checkoutsResults.findIndex(
                (checkoutRe) => checkoutRe.id_payment == id
              );
              this.checkouts.splice(index, 1);
              this.checkoutsResults.splice(indexx, 1);
              location.reload();
            }, 2000);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
