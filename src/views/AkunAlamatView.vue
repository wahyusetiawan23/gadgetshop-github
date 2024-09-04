<template>
  <div class="akun">
    <navbar-component />
    <section class="content-page-akun">
      <div class="container">
        <div class="content-akun">
          <h5 class="title">AKUN SAYA</h5>
          <div class="row">
            <div class="col-md-3">
              <MenuAkunComponent />
            </div>
            <div class="col-md-9">
              <div class="card-content-alamat">
                <div class="header-alamat">
                  <div class="title-header">Alamat Saya</div>
                  <button-add-alamat-component v-if="alamatList.length < 4" />
                </div>
                <div class="content-alamat">
                  <div v-if="notfound" class="text-center">
                    <div class="d-flex justify-content-center">
                      <img
                        src="../assets/img/alamat.png"
                        style="width: 30%; margin-top: -50px"
                        alt=""
                      />
                    </div>

                    <p
                      style="
                        margin: -50px 0px 0px 0px;
                        font-size: 18px;
                        font-weight: 500;
                      "
                    >
                      Tambah alamat baru
                    </p>
                    <p style="font-size: 16px; color: #707070">
                      (Maksimal 4 Alamat)
                    </p>
                  </div>
                  <div
                    class="content"
                    v-for="alamat in reversedAlamatList"
                    :key="alamat.id"
                  >
                    <div class="row">
                      <div class="col-md-8 col-7 col-alamat">
                        <div class="title">
                          <p class="nama">
                            {{ namaAlamatMap[alamat.label] || "" }}
                          </p>
                          <p class="contact">
                            <span>{{ alamat.penerima }}</span>
                            {{ alamat.nomor_hp }}
                          </p>
                          <p class="alamat">
                            {{ alamat.alamat_lengkap }}, {{ alamat.kecamatan }},
                            {{ alamat.kabupaten }},
                            {{ alamat.provinsi }}
                          </p>
                          <p class="alamat">{{ alamat.kode_pos }}</p>
                          <span
                            class="badge text-bg-success"
                            v-if="alamat.parrent == 1"
                            >Alamat Utama</span
                          >
                        </div>
                      </div>
                      <div class="col-md-4 col-5 content-btn-alamat">
                        <div class="btn-detail-alamat">
                          <a
                            class="btn btn-sm btn-warning me-1"
                            data-bs-toggle="modal"
                            data-bs-target="#modalEdit"
                            @click="alamatModal(alamat.id)"
                          >
                            <font-awesome-icon
                              icon="fa-solid fa-pen-to-square"
                            />
                          </a>
                          <a
                            class="btn btn-sm btn-danger"
                            @click="hapusAlamat(alamat.id)"
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
            <h5 class="modal-title">Edit Alamat</h5>
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
              <select
                class="form-select"
                id="nama_alamat"
                v-model="alamatmodal.label"
              >
                <option
                  v-for="alamat in alamats"
                  :key="alamat.id"
                  :value="alamat.id"
                >
                  {{ getAlamatLabel(alamat.id) }}
                </option>
              </select>
            </div>

            <div class="mb-2">
              <label for="nama" class="form-label">Nama Penerima</label>
              <input
                type="text"
                class="form-control"
                id="nama"
                v-model="alamatmodal.penerima"
                @input="updateCounter"
              />
            </div>
            <div class="mb-2">
              <label for="telepon" class="form-label">Nomor Telepon</label>
              <input
                type="text"
                class="form-control"
                id="telepon"
                maxlength="14"
                minlength="9"
                v-model="alamatmodal.nomor_hp"
                @input="updateCounter"
              />
            </div>
            <div class="mb-2">
              <label for="provinsi" class="form-label">Provinsi</label>
              <select
                class="form-select"
                id="provinsi"
                v-model="alamatmodal.id_provinsi"
                @change="getKabupatenList"
              >
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
                v-model="alamatmodal.id_kabupaten"
                @change="getCityId"
              >
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
                v-model="alamatmodal.id_kecamatan"
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
            <div class="mb-2">
              <label for="alamat" class="form-label">Alamat Lengkap</label>
              <textarea
                class="form-control"
                id="alamat"
                v-model="alamatmodal.alamat_lengkap"
                @input="updateCounter"
              ></textarea>
            </div>
            <div class="mb-2">
              <label for="pos" class="form-label">Kode Pos</label>
              <input
                type="text"
                class="form-control"
                id="pos"
                minlength="5"
                maxlength="5"
                v-model="alamatmodal.kode_pos"
                @input="updateCounter"
              />
            </div>
            <div class="form-check mb-2">
              <label>
                <input
                  type="checkbox"
                  :value="alamatmodal.parrent"
                  :checked="alamatmodal.parrent == 1"
                  ref="theCheckbox"
                  class="checkbox form-check-input"
                />
                <span>Jadikan Alamat Utama</span>
              </label>
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
            <a href="" v-if="disabled" class="btn btn-success disabled"
              >Tunggu Beberapa Saat..</a
            >
            <button
              v-else
              type="button"
              class="btn btn-success"
              @click="editAlamat"
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
import Swal from "sweetalert2";
import MenuAkunComponent from "@/components/MenuAkunComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import ButtonAddAlamatComponent from "@/components/ButtonAddAlamatComponent.vue";
import apis from "@/apis";
export default {
  components: {
    MenuAkunComponent,
    NavbarComponent,
    ButtonAddAlamatComponent,
  },
  metaInfo() {
    return {
      title: "Alamat anda di Gadgetshop",
    };
  },
  data() {
    return {
      namaAlamatMap: {
        1: "Rumah",
        2: "Apartemen",
        3: "Kantor",
      },
      notfound: false,
      type: "password",
      userInfo: "",
      alamatmodal: "",
      alamatList: [],
      disabled: false,
      alamats: [
        { id: 1, name: "Rumah" },
        { id: 2, name: "Apartemen" },
        { id: 3, name: "Kantor" },
      ],
      provinsiList: [],
      kabupatenList: [],
      kecamatanList: [],
      kabupatens: "",
    };
  },
  computed: {
    reversedAlamatList() {
      return this.alamatList.slice().reverse();
    },
  },
  async created() {
    try {
      const token = sessionStorage.getItem("trash");
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
    } catch (error) {
      // console.error(error);
      this.notfound = true;
    }
    if (!sessionStorage.getItem("trash")) {
      this.$router.push("/login");
      this.$toast.info("Anda harus login terlebih dahulu", {
        timeout: 2000,
      });
    }
  },
  methods: {
    updateCounter() {
      this.alamatmodal.kode_pos = this.alamatmodal.kode_pos.replace(/\D/g, "");
      this.alamatmodal.nomor_hp = this.alamatmodal.nomor_hp.replace(/\D/g, "");
    },
    editAlamat: async function () {
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
      if (!this.alamatmodal.nomor_hp.match(/^(08|62)\d+$/)) {
        this.$toast.error("Nomor Handphone harus diawali dengan 08 atau 62", {
          timeout: 2000,
        });
        return;
      }

      if (isNaN(this.alamatmodal.nomor_hp)) {
        this.$toast.error("Nomor Handphone harus berupa angka", {
          timeout: 2000,
        });
        return;
      }
      if (
        this.alamatmodal.nomor_hp.length < 9 ||
        this.alamatmodal.nomor_hp.length > 14
      ) {
        this.$toast.error("Nomor Telepon  minimal 9 dan maksimal 14", {
          timeout: 2000,
        });
        return;
      }
      if (isNaN(this.alamatmodal.kode_pos)) {
        this.$toast.error("Kode Pos harus berupa angka", {
          timeout: 2000,
        });
        return;
      }
      if (
        this.alamatmodal.kode_pos.length < 5 ||
        this.alamatmodal.kode_pos.length > 5
      ) {
        this.$toast.error("Pos harus terdiri dari 5 Angka!", {
          timeout: 2000,
        });
        return;
      }
      try {
        this.disabled = true;
        var token = sessionStorage.getItem("trash");
        var refID = 0;
        if (this.$refs.theCheckbox.checked) {
          refID = 1;
        }
        var postData = {
          addressID: this.alamatmodal.id,
          label: this.alamatmodal.label,
          alamat: this.alamatmodal.alamat_lengkap,
          penerima: this.alamatmodal.penerima,
          nomorhp: this.alamatmodal.nomor_hp,
          provinsi: this.alamatmodal.id_provinsi,
          kabupaten: this.alamatmodal.id_kabupaten,
          kecamatan: this.alamatmodal.id_kecamatan,
          kode_pos: this.alamatmodal.kode_pos,
          parrent: refID,
        };

        const response = await apis.apis.post(
          apis.ContentPath + "/addressPUT",
          postData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        if (response.data) {
          this.$toast.success("Anda berhasil mengupdate alamat", {
            timeout: 2000,
          });
          setTimeout(() => {
            this.$toast.dismiss();
            response;
            this.disabled = false;
            location.reload();
          }, 2000);
        }
      } catch (error) {
        // console.log(error);
        this.$toast.error("Gagal mengubah alamat", {
          timeout: 2000,
        });
        setTimeout(() => {
          this.$toast.dismiss();
          this.disabled = false;
        }, 2000);
      }
    },
    getAlamatLabel(id) {
      const alamat = this.alamats.find((alamat) => alamat.id === id);
      return alamat ? alamat.name : "";
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
          provinsi: this.alamatmodal.id_provinsi,
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
      } catch (error) {
        // console.error(error);
      }
    },
    async getCityId() {
      const selectedKabupaten = this.kabupatenList.find(
        (item) => item.city_name === this.alamatmodal.kabupaten
      );
      if (selectedKabupaten) {
        this.alamatmodal.city_id = selectedKabupaten.city_id;
      }

      try {
        var token = sessionStorage.getItem("trash");
        var postData = {
          kabupaten: this.alamatmodal.id_kabupaten,
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
      } catch (error) {
        // console.error(error);
      }
    },
    alamatModal(id) {
      var token = sessionStorage.getItem("trash");
      var postData = {
        addressID: id,
      };
      apis.apis
        .post(apis.ContentPath + "/addressById", postData, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          this.alamatmodal = response.data;
          // this.getKabupatenList(response.data.id_provinsi);
          this.getProvinces();
          this.getKabupatenList();
          this.getCityId();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    hapusAlamat(id) {
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Anda akan menghapus alamat Anda",
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
          var token = sessionStorage.getItem("trash");
          var postData = {
            addressID: id,
          };
          apis.apis
            .post(apis.ContentPath + "/addressDEL", postData, {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            })
            .then(() => {
              this.$toast.warning("Alamat berhasil dihapus", {
                timeout: 2000,
              });
              setTimeout(() => {
                this.$toast.dismiss();
                const index = this.alamatList.findIndex(
                  (alamat) => alamat.id === id
                );
                this.alamatList.splice(index, 1);
                location.reload();
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
