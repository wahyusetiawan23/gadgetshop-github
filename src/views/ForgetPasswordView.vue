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
                  <h5 class="title-login mt-2">Lupa Password Anda?</h5>
                  <span class="desc-login"
                    >Link untuk reset password akan kami kirimkan ke email
                    anda</span
                  >
                  <!-- <form @submit.prevent> -->
                  <div class="input-form">
                    <div class="mb-2">
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="Email Akun Anda"
                        v-model="email"
                      />
                    </div>
                  </div>
                  <div class="btn-forget">
                    <button
                      @click.prevent="resetPassword"
                      class="btn btn-danger"
                    >
                      Reset Password
                    </button>
                  </div>
                  <!-- </form> -->
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
import apis from "@/apis";
export default {
  components: { NavbarComponent },
  metaInfo() {
    return {
      title: "Forgot Password Gadgetshop",
    };
  },
  data() {
    return {
      email: "",
    };
  },
  methods: {
    resetPassword() {
      apis.apis
        .post(
          apis.AuthPath + "/forgotpassword",
          {
            email: this.email,
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
          this.$toast.error("Reset password gagal, Email tidak terdaftar!", {
            timeout: 2000,
          });
        });
    },
  },
};
</script>
