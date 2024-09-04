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
                <div class="header-profil">Ubah Password</div>
                <div class="content-profil">
                  <form @submit.prevent="updatePassword">
                    <div class="card-body">
                      <div class="form-group row mb-3">
                        <label for="lama" class="col-sm-3 col-form-label"
                          >Password Lama</label
                        >
                        <div class="col-sm-9">
                          <div class="input-group">
                            <input
                              :type="type"
                              class="form-control"
                              id="lama"
                              v-model="password"
                              placeholder="*********"
                            />
                            <span class="input-group-text" id="basic-addon1">
                              <a
                                href="#"
                                title="show password"
                                data-bs-toggle="tooltip"
                                @click="showPassword()"
                              >
                                <font-awesome-icon
                                  icon="fa-solid fa-eye-slash"
                                />
                              </a>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="form-group row mb-3">
                        <label for="baru" class="col-sm-3 col-form-label"
                          >Password Baru</label
                        >
                        <div class="col-sm-9">
                          <div class="input-group">
                            <input
                              :type="types"
                              class="form-control"
                              id="baru"
                              v-model="password2"
                              placeholder="*********"
                            />
                            <span class="input-group-text" id="basic-addon2">
                              <a
                                href="#"
                                title="show password"
                                data-bs-toggle="tooltip"
                                @click="showPassword2()"
                              >
                                <font-awesome-icon
                                  icon="fa-solid fa-eye-slash"
                                />
                              </a>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="btn-profil">
                      <button type="submit" class="btn btn-success">
                        Update Password
                      </button>
                    </div>
                  </form>
                  <button
                    type="submit"
                    class="btn btn-outline-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#editPassword"
                  >
                    Lupa Password?
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
      id="editPassword"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Lupa Password Anda?</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- <form @submit.prevent="resetPassword"> -->
            <p class="text-center mb-2">
              Link untuk reset password akan kami kirimkan ke email Anda
            </p>
            <div class="mb-2">
              <input
                disabled
                type="email"
                class="form-control"
                placeholder="Email akun anda"
                id="email"
                v-model="data.email"
              />
            </div>
            <div class="btn-modal-password">
              <a href="" @click.prevent="resetPassword" class="btn btn-danger"
                >Reset Password</a
              >
            </div>
            <!-- </form> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuAkunComponent from "@/components/MenuAkunComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import apis from "@/apis";
import Swal from "sweetalert2";
export default {
  components: { MenuAkunComponent, NavbarComponent },
  metaInfo() {
    return {
      title: "Profil anda di Gagdetshop",
    };
  },
  data() {
    return {
      type: "password",
      types: "password",
      data: "",
      password: "",
      password2: "",
    };
  },
  mounted() {
    const token = sessionStorage.getItem("trash");

    if (token) {
      apis.apis
        .post(apis.ContentPath + "/validate", null, {
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
  created() {
    if (!sessionStorage.getItem("trash")) {
      this.$router.push("/login");
      this.$toast.info("Anda harus login terlebih dahulu", {
        timeout: 2000,
      });
    }
  },
  methods: {
    updatePassword() {
      if (this.password2.length < 4 || this.password2.length > 20) {
        this.$toast.error("Password harus terdiri dari 4-20 Karakter!", {
          timeout: 2000,
        });
        return;
      }
      if (/\s/.test(this.password2)) {
        this.$toast.error("Password tidak bisa menggunakan spasi!", {
          timeout: 2000,
        });
        return;
      }
      var postData = {
        oldpassword: this.password,
        newpassword: this.password2,
      };
      const token = sessionStorage.getItem("trash");
      apis.apis
        .post(apis.ContentPath + "/userPasswordChange", postData, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          response;
          this.$toast.success("Password berhasil diubah!", {
            timeout: 2000,
          });

          this.password = "";
          this.password2 = "";
        })
        .catch((error) => {
          // console.error(error);
          error;
          this.$toast.error(
            "Update password gagal, Password lama tidak sesuai!",
            {
              timeout: 2000,
            }
          );
        });
    },
    resetPassword() {
      const email = this.data.email;
      apis.apis
        .post(
          apis.AuthPath + "/forgotpassword",
          {
            email: email,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
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
              location.reload();
              this.response = response.data;
            }
          });
        })
        .catch((error) => {
          // console.error(error);
          error;
        });
    },
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    showPassword2() {
      if (this.types === "password") {
        this.types = "text";
      } else {
        this.types = "password";
      }
    },
  },
};
</script>
