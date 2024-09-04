import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductDetailView from "../views/ProductDetailView.vue";
import ProductView from "../views/ProductView.vue";
import ProductKategoriView from "../views/ProductKategoriView.vue";
import CartView from "../views/CartView.vue";
import WishlistView from "../views/WishlistView.vue";
import LoginView from "../views/LoginView.vue";
import DaftarView from "../views/DaftarView.vue";
import AkunView from "../views/AkunView.vue";
import AkunAlamatView from "../views/AkunAlamatView.vue";
import DetailBayarView from "../views/DetailBayarView.vue";
import BayarView from "../views/BayarView.vue";
import ProsesView from "../views/ProsesView.vue";
import PengirimanView from "../views/PengirimanView.vue";
import TerimaView from "../views/TerimaView.vue";
import PasswordView from "../views/PasswordView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import ForgetPasswordView from "../views/ForgetPasswordView.vue";
import InvoiceDetailView from "../views/InvoiceDetailView.vue";
import TermsView from "../views/TermsView.vue";
import PrivasiView from "../views/PrivasiView.vue";
import SearchProductView from "../views/SearchProductView.vue";
import MitraProductView from "../views/MitraProductView.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "Search",
  //   component: SearchProductView,
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },
  // {
  //   path: "/mitra/:id",
  //   name: "MitraDetail",
  //   component: MitraProductView,
  // },
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFoundView,
  },
  {
    path: "/detail/:id",
    name: "Produk Detail",
    component: ProductDetailView,
    props: true,
  },
  {
    path: "/product",
    name: "Produk",
    component: ProductView,
  },
  {
    path: "/product-kategori/:id",
    name: "Produk Kategori",
    component: ProductKategoriView,
  },
  {
    path: "/cart",
    name: "Keranjang",
    component: CartView,
  },
  {
    path: "/wishlist",
    name: "Wishlist",
    component: WishlistView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/daftar",
    name: "Daftar",
    component: DaftarView,
  },
  {
    path: "/akun",
    name: "Akun",
    component: AkunView,
  },
  {
    path: "/alamat",
    name: "Alamat",
    component: AkunAlamatView,
  },
  {
    path: "/detail-bayar",
    name: "Detail",
    component: DetailBayarView,
  },
  {
    path: "/bayar",
    name: "Pembayaran",
    component: BayarView,
  },
  {
    path: "/proses",
    name: "Proses",
    component: ProsesView,
  },
  {
    path: "/pengiriman",
    name: "Pengiriman",
    component: PengirimanView,
  },
  {
    path: "/selesai",
    name: "Selesai",
    component: TerimaView,
  },
  {
    path: "/password",
    name: "Password",
    component: PasswordView,
  },
  {
    path: "/forget-password",
    name: "Forget Password",
    component: ForgetPasswordView,
  },
  {
    path: "/invoice_detail/:id",
    name: "Invoice",
    component: InvoiceDetailView,
    props: true,
  },
  {
    path: "/terms",
    name: "Terms",
    component: TermsView,
  },
  {
    path: "/privacy",
    name: "Privasi",
    component: PrivasiView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
