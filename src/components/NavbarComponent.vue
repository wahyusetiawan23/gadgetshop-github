<template>
  <div class="sticky-top">
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <router-link class="navbar-brand" to="/"
          ><img src="../assets/img/logo new.png" alt=""
        /></router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="isToggled = !isToggled"
          :class="{ active: isToggled }"
        >
          <font-awesome-icon
            :icon="['fa-solid', isToggled ? 'fa-xmark' : 'fa-align-right']"
          />
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent1">
          <ul class="navbar-nav navbar-hide ms-auto mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/"
                ><font-awesome-icon
                  icon="fa-solid fa-house"
                  class="me-1"
                />Home</router-link
              >
            </li>
            <li class="nav-item dropdown" v-if="data">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                ><font-awesome-icon icon="fa-solid fa-user" class="me-1" />
                {{ data.nama }}</a
              >
              <ul class="dropdown-menu dropdown-menu-lg-end">
                <li>
                  <router-link class="dropdown-item" to="/akun"
                    >Akun</router-link
                  >
                </li>
                <li>
                  <router-link class="dropdown-item" to="/bayar"
                    >Pesanan
                  </router-link>
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click.prevent="showAlert"
                    >Keluar</a
                  >
                </li>
              </ul>
            </li>

            <li v-else class="nav-item d-flex">
              <router-link class="nav-link in" to="/login">
                <font-awesome-icon
                  icon="fa-solid fa-right-to-bracket"
                  class="me-1"
                />
                Masuk
              </router-link>
              <span class="nav-link">/</span>
              <router-link class="nav-link out" to="/daftar">
                Daftar
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/wishlist"
                v-b-tooltip.hover="'Wishlist'"
                ><font-awesome-icon
                  :icon="['fa-solid', 'fa-heart']"
                  :class="wishlistIconClass"
                  size="xl"
              /></router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/cart"
                ref="cartLink"
                class="nav-link position-relative cart-link"
                v-b-tooltip.hover="'Keranjang'"
                ><font-awesome-icon icon="fa-solid fa-cart-plus" size="xl" />
                <span
                  v-if="cartItemCount"
                  class="position-absolute top-4 start-100 translate-middle badge bg-warning text-dark"
                  >{{ cartItemCount }}</span
                >
              </router-link>
            </li>
          </ul>

          <!-- navbar mobile toggle -->
          <ul class="navbar-nav ms-auto mb-lg-0 navbar-show">
            <li class="nav-item">
              <router-link
                class="nav-link"
                aria-current="page"
                to="/wishlist"
                :class="wishlistIconClass"
                ><font-awesome-icon icon="fa-solid fa-heart" /><span
                  class="px-2"
                  >Wishlist</span
                ></router-link
              >
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <a class="nav-link" aria-current="page" @click.prevent="showAlert"
                ><font-awesome-icon icon="fa-solid fa-right-to-bracket" /><span
                  class="px-2"
                  >Logout</span
                ></a
              >
            </li>
            <li v-else class="nav-item d-flex">
              <router-link class="nav-link in" to="/login">
                <font-awesome-icon
                  icon="fa-solid fa-right-to-bracket"
                  class="me-2"
                />
                Masuk
              </router-link>
              <span class="nav-link slash">/</span>
              <router-link class="nav-link out" to="/daftar">
                Daftar
              </router-link>
            </li>
          </ul>
          <!-- akhir navbar mobile toggle  -->
        </div>
      </div>
    </nav>
    <!-- akhir navbar -->
    <!-- navbar bottom mobile-->
    <div class="bottom-bar showsmall">
      <div class="row">
        <div class="col">
          <a @click="Home()"
            ><font-awesome-icon icon="fa-solid fa-house" /><small
              >Home</small
            ></a
          >
        </div>
        <div class="col">
          <a @click="Produk()">
            <font-awesome-icon icon="fa-solid fa-bag-shopping" /><small
              >Produk</small
            ></a
          >
        </div>
        <div class="col ss">
          <a @click="Cart()"
            ><font-awesome-icon icon="fa-solid fa-shopping-cart" />
            <span
              v-if="cartItemCount"
              class="position-absolute mt-2 start-100 translate-middle badge bg-warning text-dark"
              >{{ cartItemCount }}</span
            ><small>Keranjang</small></a
          >
        </div>
        <div class="col">
          <a @click="Pesan()"
            ><font-awesome-icon icon="fa-solid fa-box" /><small
              >Pesanan</small
            ></a
          >
        </div>
        <div class="col">
          <a @click="Akun()"
            ><font-awesome-icon icon="fa-solid fa-user-circle" /><small
              >Akun</small
            ></a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { EventBus } from "@/event-bus.js";
import router from "@/router";
import apis from "@/apis";
export default {
  name: "NavbarComponent",
  data() {
    return {
      showSearch: false,
      isLoggedIn: false,
      userInfo: null,
      cartItemCount: 0,
      wishlistCount: 0,
      data: null,
      isToggled: false,
    };
  },

  computed: {
    wishlistIconClass() {
      return this.wishlistCount > 0 ? "text-warning" : "";
    },
  },
  async mounted() {
    const token = sessionStorage.getItem("trash");
    this.$root.$emit("ajax-start");
    if (token) {
      try {
        const response = await apis.apis.post(
          apis.ContentPath + "/validate",
          null,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        this.data = response.data;
      } catch (error) {
        // console.error(error);
        await this.loginMore();
      }
    } else {
      // console.log();
    }
  },
  created() {
    const userInfo = sessionStorage.getItem("trash");
    if (userInfo) {
      this.isLoggedIn = true;
      this.userInfo = userInfo;
      this.getCountCart();
      this.getCountWishlist();
    }
  },

  methods: {
    toggleToggler() {
      this.isToggled = !this.isToggled;
    },

    getCountCart() {
      var token = sessionStorage.getItem("trash");
      apis.apis
        .post(apis.ContentPath + "/cartCount", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.cartItems = response.data;
          this.cartItemCount = this.cartItems.length;
        })
        .catch((error) => {
          // console.error(error);
          error;
        });
      EventBus.$on("cartUpdated", () => {
        this.cartItemCount++;
      });
      EventBus.$on("cartDelete", () => {
        this.cartItemCount--;
      });
    },
    getCountWishlist() {
      var token = sessionStorage.getItem("trash");
      apis.apis
        .post(apis.ContentPath + "/wishlistCount", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.wishlist = response.data;
          this.wishlistCount = this.wishlist.length;
        })
        .catch((error) => {
          // console.error(error);
          error;
        });
      EventBus.$on("wishlistUpdated", () => {
        this.wishlistCount++;
      });
      EventBus.$on("wishlistDelete", () => {
        this.wishlistCount--;
      });
    },
    async showAlert() {
      Swal.fire({
        title: " Logout",
        text: "Apakah anda yakin untuk meninggalkan halaman ini?",
        icon: "warning",
        iconColor: "#bf3c3c",
        color: "#fff",
        background: " #00000080",
        showCancelButton: true,
        confirmButtonColor: "#bf3c3c",
        confirmButtonText: "Ya!",
        cancelButtonText: "Tidak",
      }).then((result) => {
        if (result.isConfirmed) {
          this.logout();
        } else {
          return false;
        }
      });
    },
    logout() {
      this.$toast.error("Anda Sudah Logout", {
        timeout: 2000,
      });
      setTimeout(() => {
        this.$toast.dismiss();
        EventBus.$emit("cartDelete");
        EventBus.$emit("wishlistDelete");
        sessionStorage.removeItem("trash");
        this.userInfo = null;
        this.isLoggedIn = false;
        if (this.$route.path !== "/login") {
          this.$router.push("/login");
        }
      }, 2000);
    },
    loginMore() {
      this.$toast.error("Silahkan login kembali, Terimakasih", {
        timeout: 2000,
      });
      setTimeout(() => {
        this.$toast.dismiss();
        EventBus.$emit("cartDelete");
        EventBus.$emit("wishlistDelete");
        sessionStorage.removeItem("trash");
        this.userInfo = null;
        this.isLoggedIn = false;
        if (this.$route.path !== "/login") {
          this.$router.push("/login");
        }
      }, 2000);
    },
    Akun() {
      if (!sessionStorage.getItem("trash")) {
        if (this.$route.path !== "/login") {
          this.$toast.error("Anda harus login terlebih dahulu", {
            timeout: 2000,
          });
          router.push("/login");
        }
      } else {
        if (this.$route.path !== "/akun") {
          router.push("/akun");
        }
      }
    },
    Pesan() {
      if (!sessionStorage.getItem("trash")) {
        if (this.$route.path !== "/login") {
          this.$toast.error("Anda harus login terlebih dahulu", {
            timeout: 2000,
          });
          router.push("/login");
        }
      } else {
        if (this.$route.path !== "/bayar") {
          router.push("/bayar");
        }
      }
    },
    Home() {
      if (this.$route.path !== "/beranda") {
        router.push("/beranda");
      }
    },
    Produk() {
      if (this.$route.path !== "/product") {
        router.push("/product");
      }
    },
    Cart() {
      if (this.$route.path !== "/cart") {
        router.push("/cart");
      }
    },
  },
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.ss .start-100 {
  left: 66px !important;
}
.ss .mt-2 {
  margin-top: 0.7rem !important;
}
.in {
  margin-right: -10px;
}
.out {
  margin-left: -10px;
}
.slash {
  margin-left: 20px !important;
}
</style>
