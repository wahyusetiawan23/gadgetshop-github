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
              <div class="card-content-profil">
                <div class="header-profil">Data Profil</div>
                <div class="content-profil">
                  <form @submit.prevent="updateProfile">
                    <div class="card-body">
                      <div class="form-group row mb-3">
                        <label for="email" class="col-sm-3 col-form-label"
                          >Email
                          <span
                            ><a
                              href=""
                              data-bs-toggle="modal"
                              data-bs-target="#editEmail"
                              class="ubah_email"
                              >(Ubah Email)</a
                            >
                          </span></label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            disabled
                            id="email"
                            :value="data.email"
                          />
                        </div>
                      </div>
                      <div class="form-group row mb-3">
                        <label for="nama" class="col-sm-3 col-form-label"
                          >Nama Lengkap</label
                        >
                        <div class="col-sm-9 input-with-counter">
                          <input
                            type="text"
                            class="form-control"
                            id="nama"
                            v-model="data.nama_lengkap"
                            maxlength="50"
                            @input="updateCounter(data)"
                          />
                          <div class="character-counter">
                            {{ characterCount.nama_lengkap }} / 50
                          </div>
                        </div>
                      </div>
                      <div class="form-group row mb-3">
                        <label for="nomor" class="col-sm-3 col-form-label"
                          >Nomor Handphone</label
                        >
                        <div class="col-sm-9 input-with-counter">
                          <input
                            type="text"
                            placeholder="Contoh : 08xxxxxxx / 62xxxxxxx"
                            class="form-control"
                            id="nomor"
                            v-model="data.no_hp"
                            :maxlength="14"
                            @input="updateCounter(data)"
                          />
                          <div class="character-counter">
                            {{ characterCount.no_hp }} / 14
                          </div>
                        </div>
                      </div>
                      <div class="form-group row mb-3">
                        <label for="tanggal" class="col-sm-3 col-form-label"
                          >Tanggal Lahir <br />
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="date"
                            class="form-control"
                            placeholder="Required"
                            id="tanggal"
                            :value="data.tgl_lahir"
                          />
                        </div>
                      </div>
                      <div class="form-group row mb-3">
                        <label
                          for="jenis_kelamin"
                          class="col-sm-3 col-form-label"
                          >Jenis Kelamin</label
                        >
                        <div class="col-sm-9">
                          <select
                            class="form-select"
                            id="jenis_kelamin"
                            :value="data.jenis_kelamin"
                          >
                            <option
                              :value="null"
                              :selected="data.jenis_kelamin == null"
                              disabled
                            >
                              Pilih Jenis Kelamin
                            </option>
                            <option
                              :value="1"
                              :selected="data.jenis_kelamin == 1"
                            >
                              Laki-laki
                            </option>
                            <option
                              :value="2"
                              :selected="data.jenis_kelamin == 2"
                            >
                              Perempuan
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="btn-profil">
                      <button type="submit" class="btn btn-success">
                        Update Profil
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div
      class="modal fade modal-alamat"
      id="editEmail"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ubah Email Anda?</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p class="text-center mb-2">
              Link untuk ubah email akan kami kirimkan ke email Anda
            </p>
            <div class="mb-2">
              <label for="email" class="form-label d-flex">
                <span>Email</span>
              </label>
              <input
                disabled
                type="email"
                class="form-control"
                v-model="data.email"
                placeholder="Masukkan email anda"
                id="email"
              />
            </div>
            <div class="btn-modal-alamat">
              <button
                type="submit"
                @click.prevent="updateEmail"
                class="btn btn-success"
              >
                Submit
              </button>
              <p class="lupa mt-2" v-if="sosmed">
                Lupa email?
                <a
                  :href="`https://api.whatsapp.com/send?phone=62${sosmed.whatsapp}&text=Halo+Admin+saya+lupa+email`"
                  target="_blank"
                  class="link-admin"
                >
                  Hubungi Admin
                  <font-awesome-icon :icon="['fas', 'phone-flip']"
                /></a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function calculateAge(dateOfBirth) {
  let today = new Date();
  let birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  let monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}
import Swal from "sweetalert2";
import MenuAkunComponent from "@/components/MenuAkunComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import apis from "@/apis";
export default {
  components: { MenuAkunComponent, NavbarComponent },
  metaInfo() {
    return {
      title: "Profil anda di Gadgetshop",
    };
  },
  data() {
    return {
      data: "",
      sosmed: null,
      characterCount: {
        nama_lengkap: 0,
        no_hp: "",
      },
    };
  },
  computed: {
    isDataComplete() {
      return this.data.nama_lengkap.length > 0 && this.data.no_hp.length > 0;
    },
  },
  mounted() {
    const token = sessionStorage.getItem("trash");

    if (token) {
      apis.apis
        .post(apis.ContentPath + "/userAccount", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          // console.log(error);
          error;
        });
    } else {
      // console.log();
    }
  },
  async created() {
    try {
      const response = await apis.apis.post(apis.PublicPath + "/sosmed");
      this.sosmed = response.data[0];
    } catch (error) {
      // console.error(error);
    }
    if (!sessionStorage.getItem("trash")) {
      this.$router.push("/login");
      this.$toast.info("Anda harus login terlebih dahulu", {
        timeout: 2000,
      });
    }
  },
  methods: {
    updateCounter(data) {
      this.characterCount.nama_lengkap = this.data.nama_lengkap.length;
      this.characterCount.no_hp = this.data.no_hp ? this.data.no_hp.length : 0;
      const newValue = data.no_hp.replace(/\D/g, "");

      if (newValue !== data.no_hp) {
        data.no_hp = newValue;
      }
    },

    updateProfile() {
      const token = sessionStorage.getItem("trash");
      const nama = document.getElementById("nama").value;
      const nomor = document.getElementById("nomor").value;
      const tanggal = document.getElementById("tanggal").value;
      const jenis_kelamin = document.getElementById("jenis_kelamin").value;

      if (nomor === "" || tanggal === "" || jenis_kelamin === null) {
        this.$toast.error("Data belum lengkap!", {
          timeout: 2000,
        });
        return;
      }
      if (!nomor.match(/^(08|62)\d+$/)) {
        this.$toast.error("Nomor Handphone harus diawali dengan 08 atau 62", {
          timeout: 2000,
        });
        return;
      }

      if (isNaN(nomor)) {
        this.$toast.error("Nomor Handphone harus berupa angka", {
          timeout: 2000,
        });
        return;
      }

      if (calculateAge(tanggal) < 12) {
        this.$toast.error("Umur minimal 12 tahun", {
          timeout: 2000,
        });
        return;
      }
      const data = {
        nama: nama,
        nomorhp: nomor,
        tgllahir: tanggal,
        jk: jenis_kelamin,
      };
      apis.apis
        .post(apis.ContentPath + "/userAccountchange", data, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          sessionStorage.setItem("trash", response.data);
          this.$toast.success("Data berhasil diupdate", {
            timeout: 2000,
          });
          setTimeout(() => {
            this.$toast.dismiss();
            this.response = response.data;
            location.reload();
          }, 2000);
        })
        .catch((error) => {
          // console.error(error);
          error;
        });
    },
    updateEmail() {
      var token = sessionStorage.getItem("trash");
      apis.apis
        .post(apis.ContentPath + "/changeEmail", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          Swal.fire({
            title: "Success",
            html: "Silahkan cek email anda dari kami, dan ikuti tautan verifikasi yang disertakan di dalamnya.",
            icon: "success",
            iconColor: "#00985b",
            color: "#000",
            background: " #ffffff",
            confirmButtonColor: "#00985b",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              this.response = response.data;
              location.reload();
            }
          });
        })
        .catch((error) => {
          // console.error(error);
          error;
        });
    },
  },
};
</script>
