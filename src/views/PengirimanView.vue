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
                  class="btn btn-md btn-primary"
                  @click="diTerima(checkout.id_payment)"
                >
                  <font-awesome-icon
                    :icon="['fas', 'circle-check']"
                    class="me-1"
                  />
                  Pesanan DiTerima
                </button>
              </div>
            </div>
            <div class="bg-produk-pesanan">
              <div class="row">
                <div class="col-md-7">
                  <div class="row title-alamat">
                    <span
                      class="invoicess"
                      style="color: #00985b; font-size: 16px; font-weight: 500"
                    >
                      <router-link
                        :to="'/invoice_detail/' + checkout.id_payment"
                        ><div @click="reloadPage">
                          <font-awesome-icon
                            :icon="['fas', 'file-invoice']"
                            class="me-2"
                          />
                          Invoice Detail
                        </div></router-link
                      >
                    </span>
                    <div class="col-md-3">
                      <p>Waktu Pengiriman</p>
                    </div>
                    <div class="col-md-6 ss mb-1">
                      <p>
                        :
                        {{ checkout.date_send }}
                      </p>
                    </div>
                    <div class="col-md-3 invoices text-end">
                      <span
                        style="
                          color: #00985b;
                          font-size: 16px;
                          font-weight: 500;
                        "
                      >
                        <router-link
                          :to="'/invoice_detail/' + checkout.id_payment"
                          ><div @click="reloadPage">
                            <font-awesome-icon
                              :icon="['fas', 'file-invoice']"
                              class="me-2"
                            />
                            Invoice Detail
                          </div></router-link
                        >
                      </span>
                    </div>
                  </div>
                  <div
                    class="row title-alamat"
                    v-if="checkout.dropship_status != 0"
                  >
                    <div class="col-md-3">
                      <p>Dari</p>
                    </div>
                    <div class="col-md-6 ss mb-1">
                      <p>
                        :
                        {{ checkout.nama_pengirim }}
                        {{ checkout.telepon }}
                      </p>
                    </div>
                  </div>
                  <div class="row title-alamat">
                    <div class="col-md-3">
                      <p>Dikirim Ke</p>
                    </div>
                    <div class="col-md-6 ss mb-3">
                      <p>
                        :
                        {{ checkout.nama_penerima }}
                        {{ checkout.nomor_tlp }}
                      </p>
                      <p>
                        {{ checkout.alamat_lengkap }}, {{ checkout.kecamatan }},
                        {{ checkout.kabupaten }}, {{ checkout.provinsi }},
                        {{ checkout.kode_pos }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="row title-alamat">
                    <div class="col-md-3">
                      <p>Kurir</p>
                    </div>
                    <div class="col-md-9 ss mb-1">
                      <p>
                        : {{ checkout.kurir.toUpperCase() }} ({{
                          checkout.service
                        }})
                      </p>
                    </div>
                  </div>
                  <div class="row title-alamat">
                    <div class="col-md-3">
                      <p>No. Resi</p>
                    </div>
                    <div class="col-md-9 ss mb-1 d-flex gap-3">
                      <p>
                        :
                        {{ checkout.resi.toUpperCase() }}
                      </p>
                      <a
                        class="text-primary"
                        @click="copyResi(checkout.resi.toUpperCase())"
                      >
                        <font-awesome-icon icon="copy" class="me-1" />
                        SALIN
                      </a>
                    </div>
                  </div>
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
                            Number(checkoutRe.harga).toLocaleString("id-ID", {
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
                            <span>Biaya Pengiriman </span>
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
                          <span class="title-total">Total Pesanan:</span>
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
import Swal from "sweetalert2";
import router from "@/router";
import NavbarComponent from "@/components/NavbarComponent.vue";
import MenuPesananComponent from "@/components/MenuPesananComponent.vue";
import apis from "@/apis";
import { BASE_URL } from "@/config";
export default {
  components: { NavbarComponent, MenuPesananComponent },
  metaInfo() {
    return {
      title: "Pesanan Gagdetshop",
    };
  },
  data() {
    return {
      dataResponse: [],
      checkoutsResults: {},
      BASE_URL,
      dataCheckout: false,
    };
  },
  computed: {
    reversedCartList() {
      return this.dataResponse.slice().reverse();
    },
  },
  async created() {
    try {
      var postData = {
        status: 2,
      };
      const token = sessionStorage.getItem("trash");

      const response = await apis.apis.post(
        apis.ContentPath + "/orderpage",
        postData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      this.dataResponse = response.data.row;
      this.checkoutsResults = response.data.result;
      console.log(response.data.row);
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
    reloadPage() {
      if (this.$route.path !== "/invoice_detail") {
        router.push("/invoice_detail");
      }
      location.reload();
    },
    getFilteredResults(checkout) {
      return this.checkoutsResults.filter(
        (checkoutRe) => checkoutRe.id_payment === checkout.id_payment
      );
    },
    async diTerima(id) {
      try {
        const result = await Swal.fire({
          title: "Apakah Anda yakin?",
          text: "Pesanan anda sudah diterima",
          icon: "warning",
          iconColor: "#bf3c3c",
          color: "#fff",
          background: " #00000080",
          showCancelButton: true,
          confirmButtonColor: "#bf3c3c",
          confirmButtonText: "Ya, Sudah!",
          cancelButtonText: "Belum",
        });
        var postData = {
          idpayment: id,
        };
        const token = sessionStorage.getItem("trash");
        if (result.isConfirmed) {
          const response = await apis.apis.post(
            apis.ContentPath + "/orderReceived",
            postData,
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          this.$toast.success("Terimakasih!", {
            timeout: 2000,
          });
          setTimeout(() => {
            response;
            this.$toast.dismiss();
            this.$router.push("/terima");
            location.reload();
          }, 2000);
        }
      } catch (error) {
        // console.error(error);
        this.dataCheckout = true;
      }
    },
    copyResi(resi) {
      const el = document.createElement("textarea");
      el.value = resi;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);

      Swal.fire({
        icon: "success",
        title: "Nomor Resi Berhasil Disalin!",
        showConfirmButton: false,
        width: "18em",
        padding: "5px",
        timer: 1500,
        customClass: {
          title: "custom-swal-content",
          icon: "icon",
        },
      });
    },
  },
};
</script>
<style>
.custom-swal-content {
  font-size: 18px;
}
.icon {
  font-size: 10px;
}
</style>