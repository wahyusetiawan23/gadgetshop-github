<template>
  <div class="checkout">
    <navbar-component />
    <section class="content-page-kirim">
      <div class="container">
        <div class="content-kirim cek-out">
          <h5 class="title">PEMBAYARAN</h5>
          <div class="row">
            <div class="col-md-7">
              <div class="bg-detail-pesanan">
                <div class="header header-order">
                  <span>Alamat Pengiriman</span>
                  <button-add-alamat-component />
                </div>
                <div
                  class="content"
                  v-for="alamat in alamatList"
                  :key="alamat.id"
                >
                  <div class="row">
                    <div class="col-md-10">
                      <p class="nama_alamat">
                        {{ namaAlamatMap[alamat.label] || "" }}
                      </p>
                      <p class="name">
                        {{ alamat.penerima }} ({{ alamat.nomor_hp }})
                      </p>
                      <p>
                        {{ alamat.alamat_lengkap }}, {{ alamat.kecamatan }},
                        {{ alamat.kabupaten }},
                        {{ alamat.provinsi }}
                      </p>
                      <p>{{ alamat.kode_pos }}</p>
                      <span
                        class="badge text-bg-success"
                        v-if="alamat.parrent == 1"
                        >Alamat Utama</span
                      >
                    </div>
                    <div class="col-md-2 btn-modal-edit">
                      <a
                        href=""
                        data-bs-toggle="modal"
                        data-bs-target="#modalEdit"
                        class="btn btn-sm btn-warning"
                      >
                        <font-awesome-icon
                          :icon="['far', 'pen-to-square']"
                          class="me-1"
                        />
                        Ubah</a
                      >
                    </div>
                  </div>
                </div>
                <div class="dropship">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          v-model="showForm"
                          @click="showForm = !showForm"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Kirim Sebagai Dropshiper
                        </label>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-dropship" v-if="showForm">
                        <div class="row">
                          <div class="col-md input-with-counter">
                            <input
                              type="text"
                              class="form-control"
                              v-model="namaPengirim"
                              id="exampleFormControlInput1"
                              placeholder="Nama Pengirim"
                              maxlength="50"
                              @input="updateCounter"
                            />
                            <div class="character-counter">
                              {{ namaPengirim.length }} / 50
                            </div>
                          </div>
                          <div class="col-md input-with-counter">
                            <input
                              type="text"
                              class="form-control"
                              v-model="noTelepon"
                              id="exampleFormControlInput2"
                              placeholder="No Telepon"
                              maxlength="14"
                              @input="updateCounter"
                            />
                            <div class="character-counter">
                              {{ noTelepon.length }} / 14
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-detail-pesanan abc">
                <div class="header">Produk Dipesan</div>
                <div
                  class="content"
                  v-for="item in checkedOutItems"
                  :key="item.id"
                >
                  <div
                    class="row"
                    style="border-bottom: 1px solid #bbb; padding-bottom: 10px"
                  >
                    <div class="col-md-2 col-3">
                      <img
                        :src="`${BASE_URL}produk/${item.foto_1}`"
                        :disabled="item.stok == 0"
                        alt=""
                      />
                    </div>
                    <div class="col-md-10 col-8">
                      <div class="content-pesanan-detail">
                        <p class="title-produk">
                          {{ item.nama_produk }}
                        </p>
                        <p class="total-harga">
                          {{
                            Number(item.harga_jual).toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })
                          }}
                          x {{ item.qty }} Produk
                          <span class="gram"
                            >({{ item.berat * item.qty }}gram)</span
                          >
                        </p>
                        <p class="total-harga-produk">
                          <span class="text-black">Total :</span>
                          {{
                            (item.harga_jual * item.qty).toLocaleString(
                              "id-ID",
                              { style: "currency", currency: "IDR" }
                            )
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-5">
              <div class="bg-detail-pesanan">
                <div class="header">Pilih Metode Pengiriman</div>
                <form @submit.prevent>
                  <div>
                    <div
                      v-for="(courier, index) in courierList"
                      :key="index"
                      class="card-radio mt-2"
                      :class="{ selected: courier.code === selectedCourier }"
                      @click.prevent="selectCourier(courier.code)"
                    >
                      <input
                        type="radio"
                        :id="`courier-${index}`"
                        :value="courier.code"
                        v-model="selectedCourier"
                      />
                      <label :for="`courier-${index}`">
                        <img :src="`${BASE_URL}kurir/${courier.img}`" />
                        <!-- {{ courier.name }} -->
                      </label>
                    </div>
                  </div>
                </form>
                <div v-if="ongkir">
                  <div class="alert alert-danger mt-1" role="alert">
                    Kurir pengiriman yang Anda pilih tidak tersedia, Silahkan
                    pilih Method pengiriman yang lain.
                  </div>
                </div>
                <div v-if="rajaongkir.results && rajaongkir.results.length > 0">
                  <p
                    style="
                      margin-top: 10px;
                      margin-bottom: 0px;
                      font-weight: 500;
                    "
                  >
                    Pilih Service Kurir:
                  </p>
                  <div
                    class="card-radio mt-2"
                    v-for="(cost, index) in rajaongkir.results[0].costs"
                    :key="index"
                    :class="{ selected: selectedShippingCost === cost }"
                    @click.prevent="selectShippingCost(cost)"
                  >
                    <input
                      type="radio"
                      :id="`cost-${index}`"
                      :value="cost"
                      v-model="selectedShippingCost"
                    />
                    <label :for="`cost-${index}`">
                      <p>{{ cost.service }}</p>
                      {{
                        cost.cost[0].value.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })
                      }}
                      ({{ cost.cost[0].etd }} hari)</label
                    >
                  </div>
                </div>
              </div>
              <div class="bg-detail-shop">
                <div class="header">Ringkasan Belanja</div>
                <div class="detail-total">
                  <div class="total">
                    <span class="total">Sub Total</span>
                    <span class="harga">{{ totalHarga }}</span>
                  </div>
                  <div class="total" v-if="selectedShippingCost">
                    <span class="total"
                      >Ongkir
                      <span class="fw-bold mx-1"
                        >{{ cost | toUpperCase }}
                      </span>
                      ({{ selectedShippingCost.description }})</span
                    >
                    <span class="harga">{{
                      selectedShippingCost.cost[0].value.toLocaleString(
                        "id-ID",
                        {
                          style: "currency",
                          currency: "IDR",
                        }
                      )
                    }}</span>
                  </div>
                </div>
                <div class="total sub">
                  <span class="total">Total Harga</span>
                  <span class="harga">{{
                    Number(totalHargaNumeric + ongkirNumeric).toLocaleString(
                      "id-ID",
                      { style: "currency", currency: "IDR" }
                    )
                  }}</span>
                </div>
                <div class="btn-detail-bayar">
                  <button
                    :disabled="!selectedShippingCost"
                    type="submit"
                    @click="KirimData()"
                    class="btn btn-success"
                  >
                    Continue Pembayaran
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div
      class="modal fade modal-alamat"
      id="modalEdit"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ubah Alamat (Utama)</h5>
          </div>
          <div class="modal-body">
            <div
              class="bg-cek-alamat"
              style="border-bottom: 1px solid #dddddd; padding-bottom: 10px"
              v-for="alamat in alamatListed"
              :key="alamat.id"
            >
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="show"
                  :id="'show' + alamat.id"
                  :value="alamat.id"
                  :checked="isUtama(alamat)"
                />
                <label class="form-check-label" :for="'show' + alamat.id">
                  <p class="nama_alamat">
                    {{ namaAlamatMap[alamat.label] || "" }}
                  </p>
                  <p class="name">
                    {{ alamat.penerima }}
                    <span>({{ alamat.nomor_hp }})</span>
                  </p>
                  <p class="alamat">
                    {{ alamat.alamat_lengkap }}, {{ alamat.kabupaten }},
                    {{ alamat.provinsi }}
                  </p>
                  <p class="alamat">
                    <span>{{ alamat.kode_pos }}</span>
                  </p>
                </label>
              </div>
              <div class="edit-alamat">
                <span class="badge text-bg-success" v-if="alamat.parrent == 1"
                  >Alamat Utama</span
                >
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              @click="saveSelectedAlamat()"
              class="btn btn-success"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { BASE_URL } from "@/config";
import { EventBus } from "@/event-bus";
import NavbarComponent from "@/components/NavbarComponent.vue";
import apis from "@/apis";
import ButtonAddAlamatComponent from "@/components/ButtonAddAlamatComponent.vue";
export default {
  components: { NavbarComponent, ButtonAddAlamatComponent },

  metaInfo() {
    return {
      title: "Checkout",
    };
  },
  data() {
    return {
      ongkir: false,
      BASE_URL,
      showForm: false,
      rajaongkir: {},
      selectedCourier: "jne",
      courierList: [
        { code: "jne", name: "JNE", img: "jne.png" },
        { code: "sicepat", name: "SICEPAT", img: "sicepat.png" },
        { code: "jnt", name: "J&T", img: "jnt.png" },
        { code: "anteraja", name: "ANTERAJA", img: "anteraja.png" },
        { code: "lion", name: "LION PARCEL", img: "lion.png" },
      ],
      kabupatenId: null,
      totalWeight: null,
      selectedShippingCost: null,
      checkedOutItems: [],
      addToCartClicked: false,
      alamatList: [],
      alamatListed: [],
      namaPengirim: "",
      noTelepon: "",
      namaAlamatMap: {
        1: "Rumah",
        2: "Apartemen",
        3: "Kantor",
      },
    };
  },
  filters: {
    toUpperCase: function (value) {
      if (!value || typeof value !== "string") return "";
      return value.toUpperCase();
    },
  },
  async created() {
    try {
      var token = sessionStorage.getItem("trash");
      const addressResponse = await apis.apis.post(
        apis.ContentPath + "/addressByUser",
        null,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      this.alamatList = addressResponse.data.filter(
        (alamat) => alamat.parrent == 1
      );
      this.alamatListed = addressResponse.data;
      this.kecamatanId = parseInt(this.alamatList[0].id_kecamatan);
      const cartResponse = await apis.apis.post(
        apis.ContentPath + "/cartArr",
        null,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      this.checkedOutItems = cartResponse.data;
      const addressStore = await apis.apis.post(
        apis.ContentPath + "/storeAddress",
        null,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      this.address = addressStore.data;
      this.origin = parseInt(this.address.id_kecamatan);
      await this.getShippingCost();
    } catch (error) {
      // console.error(error);
      this.$toast.warning("Silahkan pilih produk di keranjang", {
        timeout: 2000,
      });
      setTimeout(() => {
        this.$toast.dismiss();
        if (this.$route.path !== "/cart") {
          this.$router.push("/cart");
        }
      }, 2000);
    }
    if (!sessionStorage.getItem("trash")) {
      this.$router.push("/cart");
      this.$toast.info(
        "Silahkan pilih produk anda di keranjang untuk checkout",
        {
          timeout: 2000,
        }
      );
    }
  },
  computed: {
    isUtama() {
      return function (alamat) {
        return alamat.parrent == 1;
      };
    },

    totalHarga() {
      let total = 0;
      this.checkedOutItems.forEach((item) => {
        total += item.harga_jual * item.qty;
      });
      return total.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
    },
    ongkirNumeric() {
      if (this.selectedShippingCost) {
        return Number(this.selectedShippingCost.cost[0].value);
      } else {
        return 0;
      }
    },
    totalHargaNumeric() {
      let total = 0;
      this.checkedOutItems.forEach((item) => {
        total += item.harga_jual * item.qty;
      });
      return total;
    },
    totalHargaPlusOngkir() {
      return this.totalHargaNumeric + this.ongkirNumeric;
    },
    totalHargaFormatted() {
      return this.totalHargaPlusOngkir.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
    },
  },
  methods: {
    updateCounter() {
      this.characterCount = this.namaPengirim.length;
      this.characterCount = this.noTelepon.length;
      this.noTelepon = this.noTelepon.replace(/\D/g, "");
    },
    async saveSelectedAlamat() {
      var alamatTerpilih = $("input[name='show']:checked").val();

      try {
        this.disabled = true;
        var token = sessionStorage.getItem("trash");

        var postData = {
          addressID: alamatTerpilih,
        };

        const response = await apis.apis.post(
          apis.ContentPath + "/addressPUTid",
          postData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        if (response.data) {
          this.$toast.success("Anda berhasil mengubah alamat pengiriman", {
            timeout: 2000,
          });
          setTimeout(() => {
            this.$toast.dismiss();
            response;
            location.reload();
          }, 2000);
        }
      } catch (error) {
        // console.log(error);
      }
    },
    async getShippingCost() {
      try {
        var token = sessionStorage.getItem("trash");
        const response = await apis.apis.post(
          apis.ContentPath + "/ekpedisi",
          {
            kurir: this.selectedCourier,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        this.rajaongkir = response.data.rajaongkir;
        this.cost = response.data.rajaongkir.results[0].code;
        this.ongkir = false;
        await this.getCost();
      } catch (error) {
        // console.error(error);
        console.log(error.response.data);
        this.rajaongkir = [];
        this.ongkir = true;
      }
    },
    selectCourier(code) {
      this.selectedShippingCost = null;
      this.selectedCourier = code;
      this.getShippingCost();
    },
    selectShippingCost(cost) {
      this.selectedShippingCost = cost;
      this.getCost();
    },
    getCost() {
      this.selectedShippingCost;
      this.cost;
    },
    async KirimData() {
      if (this.showForm) {
        if (this.namaPengirim === "" || this.noTelepon === "") {
          this.$toast.error("Data belum lengkap", {
            timeout: 2000,
          });
          return;
        }
        if (isNaN(this.noTelepon)) {
          this.$toast.error("Gunakan nomor telepon yang valid", {
            timeout: 2000,
          });
          return;
        }
        if (!this.noTelepon.match(/^(08|62)\d+$/)) {
          this.$toast.error("Nomor Handphone harus diawali dengan 08 atau 62", {
            timeout: 2000,
          });
          return;
        }
      }
      try {
        this.disabled = true;
        var token = sessionStorage.getItem("trash");

        var postData = {
          kurir: this.cost,
          service: this.selectedShippingCost.service,
          dropshipname: this.namaPengirim,
          dropshipphone: this.noTelepon,
        };

        const response = await apis.apis.post(
          apis.ContentPath + "/checkout",
          postData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        if (response.data) {
          this.$toast.success("Silahkan lakukan pembayaran", {
            timeout: 2000,
          });
          setTimeout(() => {
            this.$toast.dismiss();
            EventBus.$emit("cartDelete");
            if (this.$router.currentRoute.path !== "/bayar") {
              this.$router.push("/bayar");
            }
          }, 2000);
        }
      } catch (error) {
        // console.log(error);
      }
    },
  },
};
</script>
<style>
select {
  display: none;
}

.card-radio {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 5px;
  padding: 8px 18px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.card-radio p {
  margin-bottom: 5px;
}

.card-radio.selected {
  color: #000 !important;
  background: #ebf9f3;
  border: 2px solid #00985b;
}

.card-radio:hover {
  background-color: #f7f7f7;
}

.card-radio label {
  display: block;
  font-weight: bold;
  cursor: pointer;
}

.card-radio input {
  display: none;
}

.card-radio input:checked + label {
  color: #00985b;
}

.card-radio input:checked + label:before {
  color: #00985b;
  margin-right: 5px;
}
</style>