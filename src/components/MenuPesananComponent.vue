<template>
  <div>
    <div class="content-btn-pesanan">
      <div class="btn-group w-100">
        <router-link
          to="/bayar"
          class="btn btn-success"
          :class="{ active: $route.path === '/bayar' }"
          exact
          >Menunggu Pembayaran
          <span v-if="orderCount" class="badge bg-warning text-dark">{{
            orderCount
          }}</span></router-link
        >
        <router-link
          to="/proses"
          class="btn btn-success"
          :class="{ active: $route.path === '/proses' }"
          exact
          >Sedang Diproses
          <span v-if="orderCountProses" class="badge bg-warning text-dark">{{
            orderCountProses
          }}</span></router-link
        >
        <router-link
          to="/pengiriman"
          class="btn btn-success"
          :class="{ active: $route.path === '/pengiriman' }"
          exact
          >Dalam Pengiriman
          <span v-if="orderCountKirim" class="badge bg-warning text-dark">{{
            orderCountKirim
          }}</span></router-link
        >
        <router-link
          to="/selesai"
          class="btn btn-success"
          :class="{ active: $route.path === '/selesai' }"
          exact
          >Selesai
          <span v-if="orderCountTerima" class="badge bg-warning text-dark">{{
            orderCountTerima
          }}</span></router-link
        >
      </div>
    </div>
    <div class="content-list-menu-pesanan">
      <select
        class="form-select"
        v-model="accountMenuOption"
        @change="onChange()"
      >
        <option value="/bayar">Menunggu Pembayaran</option>
        <option value="/proses">Diproses</option>
        <option value="/pengiriman">Dikirim</option>
        <option value="/selesai">Selesai</option>
      </select>
    </div>
  </div>
</template>

<script>
import apis from "@/apis";
export default {
  name: "MenuPesananComponent",
  data() {
    return {
      accountMenuOption: "/",
      orderCount: 0,
      orderCountProses: 0,
      orderCountKirim: 0,
      orderCountTerima: 0,
    };
  },
  async created() {
    this.accountMenuOption = this.$router.history.current.fullPath;

    try {
      const token = sessionStorage.getItem("trash");
      const response = await apis.apis.post(
        apis.ContentPath + "/syncStatusPayment",
        null,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      this.dataResponse = response.data;
      await this.getCount();
    } catch (error) {
      // console.error(error);
    }
    this.getCountProses();
    this.getCountKirim();
    this.getCountTerima();
  },
  methods: {
    onChange() {
      this.$router.push(this.accountMenuOption);
    },
    async getCount() {
      try {
        const token = sessionStorage.getItem("trash");
        const response = await apis.apis.post(
          apis.ContentPath + "/listPayment",
          null,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        this.checkouts = response.data.result;
        this.orderCount = this.checkouts.length;
      } catch (error) {
        // console.error(error);
      }
    },
    async getCountProses() {
      try {
        var postData = {
          status: 1,
        };
        const token = sessionStorage.getItem("trash");
        const response = await apis.apis.post(
          apis.ContentPath + "/orderpage",
          postData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        this.dataResponse = response.data.row;
        this.orderCountProses = this.dataResponse.length;
      } catch (error) {
        // console.error(error);
      }
    },
    async getCountKirim() {
      try {
        var postData = {
          status: 2,
        };
        const token = sessionStorage.getItem("trash");
        const response = await apis.apis.post(
          apis.ContentPath + "/orderpage",
          postData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        this.dataResponse = response.data.row;
        this.orderCountKirim = this.dataResponse.length;
      } catch (error) {
        // console.error(error);
      }
    },
    async getCountTerima() {
      try {
        var postData = {
          status: 3,
        };
        const token = sessionStorage.getItem("trash");
        const response = await apis.apis.post(
          apis.ContentPath + "/orderpage",
          postData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        this.dataResponse = response.data.row;
        this.orderCountTerima = this.dataResponse.length;
      } catch (error) {
        // console.error(error);
      }
    },
  },
  watch: {
    $route(route) {
      this.accountMenuOption = route.path;
    },
  },
};
</script>
