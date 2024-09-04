<template>
  <div class="daftar">
    <navbar-component />
    <section class="content-login">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="card-login">
              <div class="d-flex justify-content-center">
                <div class="col-md-10">
                  <div class="header-daftar">
                    <h5 class="title-login mt-2">Daftar</h5>
                    <span class="desc-login"
                      >Isi formulir di bawah ini untuk mendaftar dan mendapatkan
                      akses ke fitur-fitur kami.</span
                    >
                  </div>
                  <form
                    @submit.prevent="register"
                    enctype="multipart/form-data"
                  >
                    <div class="input-form">
                      <div class="mb-2 input-with-counter">
                        <label for="nama" class="form-label"
                          >Nama Lengkap</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="nama"
                          v-model="nama"
                          placeholder="Masukkan Nama Lengkap Anda"
                          maxlength="50"
                          @input="updateCounter"
                        />
                        <div class="character-counter">
                          {{ nama.length }} / 50
                        </div>
                      </div>
                      <div class="mb-2 input-with-counter">
                        <label for="email" class="form-label">Email</label>

                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          v-model="email"
                          placeholder="Masukkan Email Anda"
                          maxlength="50"
                          @input="updateCounter"
                        />
                        <div class="character-counter">
                          {{ email.length }} / 50
                        </div>
                      </div>
                      <div class="mb-2">
                        <label for="password" class="form-label"
                          >Password</label
                        >
                        <div class="input-group mb-3">
                          <input
                            :type="type"
                            class="form-control"
                            id="password"
                            v-model="password"
                            placeholder="xxxxxxxx"
                            maxlength="20"
                            @input="updateCounter"
                          />
                          <span class="input-group-text" id="basic-addon2">
                            <a
                              href="#"
                              title="show password"
                              data-bs-toggle="tooltip"
                              @click="showPassword()"
                            >
                              <font-awesome-icon icon="fa-solid fa-eye-slash" />
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="btn-login mt-3">
                      <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="isDisabled"
                      >
                        Daftar
                      </button>
                    </div>
                  </form>

                  <div class="cta-login">
                    <span
                      >Sudah Punya Akun?
                      <router-link to="/login">Masuk</router-link></span
                    >
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
// import api from "@/api";
import apis from "@/apis";
import NavbarComponent from "@/components/NavbarComponent.vue";
import Swal from "sweetalert2";

export default {
  components: { NavbarComponent },
  metaInfo() {
    return {
      title: "Registrasi Gadgetshop",
    };
  },
  data() {
    return {
      nama: "",
      email: "",
      password: "",
      type: "password",
      isDisabled: true,
      characterCount: 0,
    };
  },
  methods: {
    updateCounter() {
      this.characterCount = this.nama.length;
      this.characterCount = this.email.length;
      this.characterCount = this.password.length;
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    register() {
      if (this.password.length < 4 || this.password.length > 20) {
        this.$toast.error("Password harus terdiri dari 4-20 Karakter!");
        return;
      }

      if (/\s/.test(this.password)) {
        this.$toast.error("Password tidak bisa menggunakan spasi!");
        return;
      }
      var postData = {
        nama: this.nama,
        email: this.email,
        password: this.password,
      };
      apis.apis
        .post(apis.AuthPath + "/register", postData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
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
              this.$router.push("/login");
              this.response = response.data;
            }
          });
          this.nama = "";
          this.email = "";
          this.password = "";
        })
        .catch((error) => {
          // console.error(error);
          error;
          this.$toast.error("Registrasi gagal, Email sudah terdaftar!", {
            timeout: 2000,
          });
        });
    },
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    checkFormValidity() {
      if (this.nama && this.email && this.password) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
  },
  watch: {
    nama: "checkFormValidity",
    email: "checkFormValidity",
    password: "checkFormValidity",
  },
};
</script>
