// import Vue from "vue";
// import Vuex from "vuex";

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {
//     checkedOutItems: [],
//     dataAlamat: [],
//   },

//   getters: {
//     weight: (state) => {
//       return state.checkedOutItems.reduce((totalWeight, item) => {
//         return totalWeight + item.product.berat * item.quantity;
//       }, 0);
//     },
//   },

//   mutations: {
//     addCheckedOutItem(state, item) {
//       state.checkedOutItems.push(item);
//     },
//     setAlamat(state, alamat) {
//       state.alamat = alamat;
//     },
//     SET_SELECTED_COURIER(state, courier) {
//       state.courier = courier;
//     },
//     SET_SELECTED_SHIPPING_COST(state, cost) {
//       state.cost = cost;
//     },
//     replaceCheckedOutItem(state, { index, item }) {
//       state.checkedOutItems.splice(index, 1, item);
//     },
//     removeCheckedOutItem(state, index) {
//       state.checkedOutItems.splice(index, 1);
//     },
//     updateCheckedOutItem(state, { index, item }) {
//       state.checkedOutItems.splice(index, 1, item);
//     },
//   },
//   actions: {
//     setAlamat(context, alamat) {
//       context.commit("setAlamat", alamat);
//     },
//     updateCheckedOutItem({ commit, state }, { index, item }) {
//       const currentIndex = state.checkedOutItems.findIndex((i) => i.id === item.id);
//       if (currentIndex !== -1 && currentIndex !== index) {
//         commit("removeCheckedOutItem", currentIndex);
//       }
//       commit("updateCheckedOutItem", { index, item });
//     },
//   },
// });
