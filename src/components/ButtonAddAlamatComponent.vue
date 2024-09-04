<template>
  <div>
    <div class="btn-alamat">
      <a
        href=""
        class="btn btn-sm btn-success"
        data-bs-toggle="modal"
        data-bs-target="#modalAlamat"
        @click.prevent="tambah()"
      >
        <font-awesome-icon
          icon="fa-solid fa-circle-plus"
          size="lg"
          class="me-1"
        /><span> Alamat</span>
      </a>
    </div>
    <div
      class="modal fade modal-alamat"
      id="modalAlamat"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Informasi Alamat</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-2">
              <label for="nama_alamat" class="form-label">Nama Alamat</label>

              <select id="fruit" class="form-select" v-model="namaAlamat">
                <option value="" disabled>-- Pilih Label Alamat --</option>
                <option
                  v-for="alamat in alamats"
                  :key="alamat.id"
                  :value="alamat.id"
                >
                  {{ alamat.name }}
                </option>
              </select>
            </div>
            <div class="mb-2 input-with-counter">
              <label for="nama" class="form-label">Nama Penerima</label>
              <input
                type="text"
                class="form-control"
                id="nama"
                maxlength="50"
                v-model="nama"
                placeholder="Nama Lengkap Penerima"
                @input="updateCounter"
              />
              <div class="character-counter">{{ nama.length }} / 50</div>
            </div>
            <div class="mb-2 input-with-counter">
              <label for="telepon" class="form-label">Nomor Telepon</label>
              <input
                type="text"
                class="form-control"
                id="telepon"
                minlength="9"
                maxlength="14"
                v-model="telepon"
                placeholder="Contoh: 081799998787"
                @input="updateCounter"
              />
              <div class="character-counter">{{ telepon.length }} / 14</div>
            </div>
            <div class="mb-2">
              <label for="provinsi" class="form-label">Provinsi</label>
              <select
                class="form-select"
                id="provinsi"
                v-model="provinsi"
                @change="getKabupatenList"
              >
                <option value="">Pilih Provinsi</option>
                <option
                  v-for="provinsi in provinsiList"
                  :value="provinsi.province_id"
                  :key="provinsi.province_id"
                >
                  {{ provinsi.province }}
                </option>
              </select>
            </div>
            <div class="mb-2">
              <label for="kabupaten" class="form-label">Kabupaten</label>
              <select
                class="form-select"
                id="kabupaten"
                v-model="kabupaten"
                disabled
                @change="getKecamatanList"
              >
                <option value="">Pilih Kabupaten</option>
                <option
                  v-for="item in kabupatenList"
                  :value="item.city_id"
                  :key="item.city_id"
                >
                  {{ item.city_name }}
                </option>
              </select>
            </div>
            <div class="mb-2">
              <label for="kabupaten" class="form-label">Kecamatan</label>
              <select
                class="form-select"
                id="kecamatan"
                v-model="kecamatan"
                disabled
              >
                <option value="">Pilih Kecamatan</option>
                <option
                  v-for="distric in kecamatanList"
                  :value="distric.subdistrict_id"
                  :key="distric.subdistrict_id"
                >
                  {{ distric.subdistrict_name }}
                </option>
              </select>
            </div>
            <div class="mb-2 input-with-counter">
              <label for="alamat" class="form-label">Alamat Lengkap</label>
              <textarea
                class="form-control"
                id="alamat"
                v-model="alamat"
                maxlength="200"
                placeholder="Contoh: Jalan Sudirman no.17"
                rows="2"
                @input="updateCounter"
              ></textarea>
              <div class="character-counter">{{ alamat.length }} / 200</div>
            </div>
            <div class="mb-2 input-with-counter">
              <label for="pos" class="form-label">Kode Pos</label>
              <input
                type="text"
                class="form-control"
                id="pos"
                v-model="pos"
                minlength="5"
                maxlength="5"
                placeholder="5 digit"
                @input="updateCounter"
              />
              <div class="character-counter">{{ pos.length }} / 5</div>
            </div>
            <div class="form-check mb-2">
              <label>
                <input
                  type="checkbox"
                  class="checkbox form-check-input"
                  v-model="utama"
                  value=""
                />
                <span>Jadikan Alamat Utama</span>
              </label>
            </div>
            <div class="btn-modal-alamat">
              <a href="" v-if="disabled" class="btn btn-success disabled"
                >Tunggu Beberapa Saat..</a
              >
              <a
                href=""
                v-else
                class="btn btn-success"
                @click.prevent="simpanAlamat"
                >Simpan Alamat</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import apis from "@/apis";
export default {
  name: "ButtonAddAlamatComponent",
  data() {
    return {
      namaAlamat: "",
      nama: "",
      telepon: "",
      alamat: "",
      pos: "",
      utama: false,
      provinsi: "",
      kabupaten: "",
      kecamatan: "",
      provinsiList: [],
      kabupatenList: [],
      kecamatanList: [],
      disabled: false,
      alamats: [
        { id: 1, name: "Rumah" },
        { id: 2, name: "Apartemen" },
        { id: 3, name: "Kantor" },
      ],
      characterCount: 0,
    };
  },

  methods: {
    tambah() {
      this.getProvinces();
    },
    updateCounter() {
      this.characterCount = this.nama.length;
      this.characterCount = this.telepon.length;
      this.characterCount = this.alamat.length;
      this.characterCount = this.pos.length;
      this.pos = this.pos.replace(/\D/g, "");
      this.telepon = this.telepon.replace(/\D/g, "");
    },
    async getProvinces() {
      try {
        var token = sessionStorage.getItem("trash");
        const response = await apis.apis.post(
          apis.ContentPath + "/province",
          null,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        this.provinsiList = response.data;
      } catch (error) {
        // console.error(error);
      }
    },
    async getKabupatenList() {
      try {
        var token = sessionStorage.getItem("trash");
        var postData = {
          provinsi: this.provinsi,
        };
        const response = await apis.apis.post(
          apis.ContentPath + "/city",
          postData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        this.kabupatenList = response.data;
        const kabupatenSelect = document.getElementById("kabupaten");
        kabupatenSelect.disabled = false;
      } catch (error) {
        // console.error(error);
      }
    },
    async getKecamatanList() {
      try {
        var token = sessionStorage.getItem("trash");
        var postData = {
          kabupaten: this.kabupaten,
        };
        const response = await apis.apis.post(
          apis.ContentPath + "/district",
          postData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        this.kecamatanList = response.data;
        const kecamatanSelect = document.getElementById("kecamatan");
        kecamatanSelect.disabled = false;
      } catch (error) {
        // console.error(error);
      }
    },

    simpanAlamat: async function () {
      if (
        this.namaAlamat === "" ||
        this.nama === "" ||
        this.telepon === "" ||
        this.alamat === "" ||
        this.pos === ""
      ) {
        this.$toast.error("Data belum lengkap", {
          timeout: 2000,
        });
        return;
      }
      if (!this.telepon.match(/^(08|62)\d+$/)) {
        this.$toast.error("Nomor Handphone harus diawali dengan 08 atau 62", {
          timeout: 2000,
        });
        return;
      }

      if (isNaN(this.telepon)) {
        this.$toast.error("Nomor Handphone harus berupa angka", {
          timeout: 2000,
        });
        return;
      }
      if (this.telepon.length < 9 || this.telepon.length > 14) {
        this.$toast.error("Nomor Telepon  minimal 9 dan maksimal 14", {
          timeout: 2000,
        });
        return;
      }
      if (isNaN(this.pos)) {
        this.$toast.error("Kode Pos harus berupa angka", {
          timeout: 2000,
        });
        return;
      }
      if (this.pos.length < 5 || this.pos.length > 5) {
        this.$toast.error("Pos harus terdiri dari 5 Angka!", {
          timeout: 2000,
        });
        return;
      }
      try {
        this.disabled = true;
        var token = sessionStorage.getItem("trash");
        var postData = {
          label: this.namaAlamat,
          alamat: this.alamat,
          penerima: this.nama,
          nomorhp: this.telepon,
          provinsi: this.provinsi,
          kabupaten: this.kabupaten,
          kecamatan: this.kecamatan,
          kode_pos: this.pos,
          parrent: this.utama,
        };
        const response = await apis.apis.post(
          apis.ContentPath + "/address",
          postData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        if (response.data) {
          this.$toast.success("Anda berhasil menambahkan alamat", {
            timeout: 2000,
          });
          setTimeout(() => {
            this.$toast.dismiss();
            location.reload();
            response;
          }, 2000);
        }
      } catch (error) {
        // console.log(error);
        this.$toast.error("Gagal menambahkan alamat", {
          timeout: 2000,
        });
        setTimeout(() => {
          this.$toast.dismiss();
          this.disabled = false;
        }, 2000);
      }
    },
  },
};
</script>
<style></style>
