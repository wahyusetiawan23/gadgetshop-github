<template>
  <div class="login">
    <navbar-component />
    <section class="content-login">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="card-login">
              <div class="d-flex justify-content-center">
                <div class="col-md-10">
                  <h5 class="title-login mt-2">Login</h5>
                  <span class="desc-login"
                    >Selamat datang kembali! Kami senang Anda kembali.</span
                  >
                  <form @submit.prevent>
                    <div class="input-form">
                      <div class="mb-2">
                        <label for="email" class="form-label">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          placeholder="Masukkan Email Anda"
                          v-model="email"
                        />
                      </div>
                      <div>
                        <label
                          for="password"
                          class="form-label mb-1"
                          style="display: flex; justify-content: space-between"
                        >
                          <span>Password</span
                          ><router-link
                            to="/forget-password"
                            class="text-danger"
                            >Lupa Password?</router-link
                          >
                        </label>
                        <div class="input-group mb-3">
                          <input
                            :type="type"
                            class="form-control"
                            id="password"
                            placeholder="xxxxxxxx"
                            v-model="password"
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
                    <div class="btn-login">
                      <button class="btn btn-primary" @click="login()">
                        Login
                      </button>
                    </div>
                  </form>

                  <div class="cta-login">
                    <span
                      >Belum Punya Akun?
                      <router-link to="/daftar">Daftar</router-link></span
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
import NavbarComponent from "@/components/NavbarComponent.vue";
import apis from "@/apis";

export default {
  components: { NavbarComponent },
  metaInfo() {
    return {
      title: "Login Gadgetshop",
    };
  },
  data() {
    return {
      type: "password",
      email: "",
      password: "",
    };
  },
  methods: {
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    async login() {
      if (this.email === "" || this.password === "") {
        this.$toast.error("Data belum lengkap", {
          timeout: 2000,
        });
      } else {
        try {
          var postData = {
            email: this.email,
            password: this.password,
          };
          const response = await apis.apis.post(
            apis.AuthPath + "/login",
            postData,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          if (response.data) {
            sessionStorage.setItem("trash", response.data);
            this.$toast.success("Login berhasil", {
              timeout: 2000,
            });
            setTimeout(() => {
              this.$toast.dismiss();
              if (this.$router.currentRoute.path !== "/") {
                this.$router.push("/");
              }
            }, 2000);
          } else {
            this.$toast.error(response.data, {
              timeout: 2000,
            });
          }
        } catch (error) {
          this.$toast.error(error.response.data, {
            timeout: 2000,
          });
        }
      }
    },
  },
};
</script>
