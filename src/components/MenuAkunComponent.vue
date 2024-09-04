<template>
  <div>
    <div class="card-profil">
      <!-- <img :src="Image" alt="" /> -->
      <img src="../assets/img/Hello.png" alt="" />
      <p>{{ data.nama_lengkap }}</p>
    </div>

    <div class="card-menu-akun">
      <div class="item-menu">
        <router-link
          to="/akun"
          :class="{ active: $route.path === '/akun' }"
          exact
          ><span
            ><font-awesome-icon
              icon="fa-solid fa-circle-user "
              class="icon"
            />Profil</span
          ><span> <font-awesome-icon icon="fa-solid fa-chevron-right " /></span
        ></router-link>
      </div>
      <div class="item-menu">
        <router-link
          to="/password"
          :class="{ active: $route.path === '/password' }"
          exact
          ><span
            ><font-awesome-icon
              icon="fa-solid fa-key "
              class="icon"
            />Password</span
          ><span> <font-awesome-icon icon="fa-solid fa-chevron-right " /></span
        ></router-link>
      </div>
      <div class="item-menu">
        <router-link
          to="/alamat"
          :class="{ active: $route.path === '/alamat' }"
          exact
          ><span
            ><font-awesome-icon
              icon="fa-solid fa-location-dot "
              class="icon"
            />Alamat</span
          ><span> <font-awesome-icon icon="fa-solid fa-chevron-right " /></span
        ></router-link>
      </div>
      <div class="item-menu">
        <a href="" @click.prevent="showAlert"
          ><span
            ><font-awesome-icon
              icon="fa-solid fa-circle-arrow-right "
              class="icon"
            />logout</span
          ><span> <font-awesome-icon icon="fa-solid fa-chevron-right " /></span
        ></a>
      </div>
    </div>
    <!--  -->
    <div class="card-list-menu-akun">
      <select
        class="form-select"
        v-model="accountMenuOption"
        @change="onChange()"
      >
        <option value="/akun">Profil</option>
        <option value="/password">Password</option>
        <option value="/alamat">Alamat</option>
      </select>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { BASE_URL } from "@/config";
import { EventBus } from "@/event-bus.js";
import apis from "@/apis";
export default {
  name: "MenuAkunComponent",
  data() {
    return {
      data: {},
      accountMenuOption: "/",
      BASE_URL,
      Image: "",
    };
  },
  created() {
    this.accountMenuOption = this.$router.history.current.fullPath;
  },
  async mounted() {
    const token = sessionStorage.getItem("trash");

    if (token) {
      try {
        const response = await apis.apis.post(
          apis.ContentPath + "/userAccount",
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
      }
    } else {
      // console.log();
    }
  },
  methods: {
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
      this.$toast.error("Anda Sudah Logut", {
        timeout: 2000,
      });
      setTimeout(() => {
        this.$toast.dismiss();
        EventBus.$emit("cartDelete");
        EventBus.$emit("wishlistDelete");
        sessionStorage.removeItem("trash");
        sessionStorage.removeItem("checkedOutItems");
        sessionStorage.removeItem("setAlamat");
        sessionStorage.removeItem("courier");
        sessionStorage.removeItem("cost");
        this.userInfo = "";
        if (this.$route.path !== "/login") {
          this.$router.push("/login");
        }
      }, 2000);
    },
    onChange() {
      this.$router.push(this.accountMenuOption);
    },
  },
  watch: {
    $route(route) {
      this.accountMenuOption = route.path;
    },
  },
};
</script>

<style></style>
