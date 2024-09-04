<template>
  <section class="invoice">
    <div v-if="showResult">
      <div class="css-ts6vuj">
        <div class="">
          <div class="btn-back d-flex align-items-center fw-bold gap-2">
            <svg
              class="unf-icon"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="var(--color-icon-enabled, #2E3137)"
              style="display: inline-block; vertical-align: middle"
            >
              <path
                d="M20 11.25H4.78l5.73-5.72a.77.77 0 0 0 0-1.07.75.75 0 0 0-1.06 0l-7.1 7.1a.77.77 0 0 0 0 1.07l7.1 7.1a.75.75 0 0 0 1.06 0 .77.77 0 0 0 0-1.07l-5.92-5.91H20a.75.75 0 1 0 0-1.5Z"
              ></path>
            </svg>
            <span class="invoice-label fw-bold">
              <router-link to="/bayar">Back</router-link>
            </span>
          </div>
        </div>
        <div class="left-section">
          <div class="btn-back">
            <svg
              class="unf-icon"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="var(--color-icon-enabled, #2E3137)"
              style="display: inline-block; vertical-align: middle"
            >
              <path
                d="M20 11.25H4.78l5.73-5.72a.77.77 0 0 0 0-1.07.75.75 0 0 0-1.06 0l-7.1 7.1a.77.77 0 0 0 0 1.07l7.1 7.1a.75.75 0 0 0 1.06 0 .77.77 0 0 0 0-1.07l-5.92-5.91H20a.75.75 0 1 0 0-1.5Z"
              ></path>
            </svg>
          </div>
          <span class="invoice-label">Invoice</span>
        </div>
        <div class="right-section">
          <div class="btn-download">
            <svg
              class="unf-icon"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="var(--color-icon-enabled, #2E3137)"
              style="display: inline-block; vertical-align: middle"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="m11.47 16-4-4a.75.75 0 0 1 1.06-1l2.72 2.69V4a.75.75 0 1 1 1.5 0v9.72L15.47 11a.75.75 0 0 1 1.06 1l-4 4a.75.75 0 0 1-1.06 0ZM17 6.24h3A1.7 1.7 0 0 1 21.75 8v10A1.7 1.7 0 0 1 20 19.75H4A1.7 1.7 0 0 1 2.25 18V8A1.7 1.7 0 0 1 4 6.25h3a.75.75 0 1 1 0 1.5H4c-.19 0-.25.07-.25.25v10c0 .19.06.25.25.25h16c.19 0 .25-.06.25-.25V7.99c0-.18-.06-.25-.25-.25h-3a.75.75 0 1 1 0-1.5Z"
              ></path>
            </svg>
          </div>
          <button
            data-unify="Button"
            class="unf-btn unf-btn--animate unf-btn--filled unf-btn--small css-w29su3-unf-btn e1512idj0"
            type="button"
          >
            <div class="css-6k8nk" @click="downloadPDF">
              <span class="css-1e63sol">Download</span>
            </div>
          </button>
        </div>
      </div>
      <div class="css-gt9at0" id="pdf-content">
        <div class="css-1t669f0">
          <div>
            <img src="../assets/img/logoblack.png" width="100" />
          </div>
          <div>
            <h4
              data-unify="Typography"
              color=""
              class="css-9l4hq0-unf-heading e12ykf334"
            >
              INVOICE
            </h4>
            <span>{{ headers.id_payment }}</span>
          </div>
        </div>
        <div class="css-idjlez">
          <div class="d-flex justify-content-center">
            <img
              src="../assets/img/lunas.png"
              style="
                position: absolute;
                top: 35%;
                left: 50%;
                transform: translate(-50%, -50%);
              "
              alt=""
            />
          </div>
          <div class="css-8nerfl">
            <div class="seller-section">
              <div class="css-hsz7n2">
                <p
                  class="header"
                  data-testid="lblInvoiceIdentifierTitle-header"
                >
                  DITERBITKAN ATAS NAMA
                </p>
              </div>
              <div class="css-hsz7n2">
                <span data-testid="lblInvoiceIdentifierTitle-1">Penjual</span>
                <p>&nbsp;{{ headers.nama_pengirim }}&nbsp;</p>
              </div>
              <div class="css-hsz7n2">
                <span data-testid="lblInvoiceIdentifierTitle-dropship"></span>
                <div
                  class="additional-address"
                  data-testid="lblInvoiceIdentifierTitle-merchandise"
                ></div>
              </div>
            </div>
            <div class="buyer-section">
              <div class="css-hsz7n2">
                <p
                  class="header"
                  data-testid="lblInvoiceIdentifierTitle-header"
                >
                  UNTUK
                </p>
              </div>
              <div class="css-hsz7n2">
                <span data-testid="lblInvoiceIdentifierTitle-1">Pembeli</span>
                <p>&nbsp;{{ headers.nama_penerima }}&nbsp;</p>
              </div>
              <div class="css-hsz7n2">
                <span data-testid="lblInvoiceIdentifierTitle-2"
                  >Tanggal Pembelian</span
                >
                <p>&nbsp;{{ headers.date_settlement }}&nbsp;</p>
              </div>
              <div class="css-hsz7n2">
                <span data-testid="lblInvoiceIdentifierTitle-address"
                  >Alamat Pengiriman</span
                >
                <div class="address">
                  <p data-testid="lblInvoiceShippingReceiverName">
                    &nbsp;{{ headers.nama_penerima }}&nbsp;<span
                      data-testid="lblInvoiceShippingReceiverPhone"
                      >({{ headers.nomor_tlp }})</span
                    >
                  </p>
                  <p>
                    {{ headers.alamat_lengkap }} {{ headers.kecamatan }},
                    {{ headers.kabupaten }}, {{ headers.provinsi }}
                    {{ headers.kode_pos }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="css-10l0hde">
            <div class="header">
              <div
                width="52%"
                data-testid="lblInvoiceProductHead-0"
                class="css-ij65tx eu5fz9l0"
              >
                Info Produk
              </div>
              <div
                width="8%"
                data-testid="lblInvoiceProductHead-1"
                class="css-jexylq eu5fz9l0"
              >
                Jumlah
              </div>
              <div
                width="20%"
                data-testid="lblInvoiceProductHead-2"
                class="css-zey3a2 eu5fz9l0"
              >
                Harga Satuan
              </div>
              <div
                width="20%"
                data-testid="lblInvoiceProductHead-3"
                class="css-zey3a2 eu5fz9l0"
              >
                Total Harga
              </div>
            </div>
            <div class="body"></div>
            <div class="body">
              <div class="item-product single">
                <div
                  class="section-product"
                  v-for="checkoutRe in products"
                  :key="checkoutRe.id"
                >
                  <div width="52%" class="css-14anr17 eu5fz9l1">
                    <a
                      href="https://tokopedia.app.link/?$desktop_url=https://www.tokopedia.com/snapshot_product?dtl_id%3D3251873801%26order_id%3D1584494980&amp;$ios_url=https://www.tokopedia.com/snapshot_product?dtl_id%3D3251873801%26order_id%3D1584494980&amp;$android_url=https://www.tokopedia.com/snapshot_product?dtl_id%3D3251873801%26order_id%3D1584494980&amp;$fallback_url=https://www.tokopedia.com/snapshot_product?dtl_id%3D3251873801%26order_id%3D1584494980&amp;$android_deeplink_path=snapshot/order/1584494980/3251873801&amp;$ios_deeplink_path=order/product_snapshot?orderId=1584494980%26orderDetailId=3251873801"
                      target="__blank"
                      rel="noopener noreferrer"
                      color=""
                      data-testid="lblInvoiceProductContentProductName-0"
                      data-unify="Typography"
                      class="css-1oovswe-unf-heading e12ykf337"
                      >{{ checkoutRe.nama_produk }}</a
                    >
                    <div class="info-product">
                      <div class="info-product__item">
                        <p
                          data-unify="Typography"
                          color=""
                          class="css-1gew4m0-unf-heading e12ykf338"
                        >
                          Berat
                        </p>
                        <p
                          data-unify="Typography"
                          color=""
                          data-testid="lblInvoiceProductContentProductWeight-0"
                          class="css-1gew4m0-unf-heading e12ykf338"
                        >
                          : {{ checkoutRe.berat }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div width="8%" class="css-1cidalh eu5fz9l1">
                    <p
                      data-unify="Typography"
                      color="#343030"
                      data-testid="lblInvoiceProductContentProductQty-0"
                      class="css-19x7ige-unf-heading e12ykf338"
                    >
                      {{ checkoutRe.qty }}
                    </p>
                  </div>
                  <div width="20%" class="css-q4cgqg eu5fz9l1">
                    <p
                      data-unify="Typography"
                      color="#343030"
                      data-testid="lblInvoiceProductContentProductPrice-0"
                      class="css-19x7ige-unf-heading e12ykf338"
                    >
                      {{
                        Number(checkoutRe.harga).toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })
                      }}
                    </p>
                  </div>
                  <div width="20%" class="css-q4cgqg eu5fz9l1">
                    <p
                      data-unify="Typography"
                      color="#343030"
                      data-testid="lblInvoiceProductContentProductPriceTotal-0"
                      class="css-19x7ige-unf-heading e12ykf338"
                    >
                      {{
                        Number(checkoutRe.subtotal).toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="css-1bbsain">
            <div class="total first ppn">
              <h6
                data-unify="Typography"
                color=""
                class="css-1bgsywi-unf-heading e12ykf336"
              >
                Total Harga ({{ kuantitas }} Barang)
              </h6>
              <h5
                data-unify="Typography"
                color=""
                class="css-ep750o-unf-heading e12ykf335"
              >
                {{
                  TotalHarga.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                }}
              </h5>
            </div>
            <div class="item-payment">
              <p
                data-unify="Typography"
                color=""
                data-testid="lblInvoicePaymentLabelSummary-1"
                class="css-1gew4m0-unf-heading e12ykf338"
              >
                Total Ongkos Kirim ({{ beratOngkir }} gr)
              </p>
              <p
                data-unify="Typography"
                color=""
                data-testid="lblInvoicePaymentValueSummary-1"
                class="css-1gew4m0-unf-heading e12y0kf338"
              >
                {{
                  Number(headers.ongkir).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                }}
              </p>
            </div>
            <div class="total ppn">
              <h6
                data-unify="Typography"
                color=""
                class="css-1bgsywi-unf-heading e12ykf336"
              >
                Total Belanja
              </h6>
              <h5
                data-unify="Typography"
                color=""
                class="css-ep750o-unf-heading e12ykf335"
              >
                {{
                  Number(headers.total).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                }}
              </h5>
            </div>

            <div class="total ppn">
              <h6
                data-unify="Typography"
                color=""
                class="css-1bgsywi-unf-heading e12ykf336"
              >
                Total Tagihan
              </h6>
              <h5
                data-unify="Typography"
                color=""
                class="css-ep750o-unf-heading e12ykf335"
              >
                {{
                  Number(headers.total).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                }}
              </h5>
            </div>
          </div>
          <div class="css-hkvvch">
            <div class="col-shipping">
              <div class="item-shipping">
                <p
                  data-unify="Typography"
                  color=""
                  class="css-1gew4m0-unf-heading e12ykf338"
                >
                  Kurir:
                </p>
                <div class="desc">
                  <h6
                    data-unify="Typography"
                    color=""
                    class="css-1bgsywi-unf-heading e12ykf336"
                  >
                    {{ kurirs }} - {{ headers.service }}
                  </h6>
                </div>
              </div>
            </div>
            <div class="col-shipping">
              <div class="item-shipping">
                <p
                  data-unify="Typography"
                  color=""
                  class="css-1gew4m0-unf-heading e12ykf338"
                >
                  Metode Pembayaran:
                </p>
                <div class="desc">
                  <h6
                    data-unify="Typography"
                    color=""
                    data-testid="lblInvoiceShippingPayMethod-0"
                    class="css-1bgsywi-unf-heading e12ykf336"
                  >
                    {{ payments }}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="css-y9aaky">
          <p
            data-unify="Typography"
            color=""
            class="css-1gew4m0-unf-heading e12ykf338"
          >
            Invoice ini sah dan diproses oleh komputer
          </p>
          <span
            v-if="headers.date_send == null && headers.date_received == null"
            >Terakhir diupdate: {{ headers.date_settlement }}</span
          >
          <span
            v-if="headers.date_send !== null && headers.date_received == null"
            >Terakhir diupdate: {{ headers.date_send }}</span
          >
          <span
            v-if="headers.date_send !== null && headers.date_received !== null"
            >Terakhir diupdate: {{ headers.date_received }}</span
          >
        </div>
      </div>
    </div>
    <div v-if="not">
      <div class="notfound">
        <img src="../assets/img/Monster 404 Error-bro.png" alt="" />
      </div>
    </div>
  </section>
</template>
  
  <script>
import html2pdf from "html2pdf.js";
import apis from "@/apis";
export default {
  name: "FooterComponent",
  metaInfo() {
    return {
      title: "Invoice",
    };
  },
  data() {
    return {
      products: {},
      headers: "",
      kuantitas: 0,
      TotalHarga: 0,
      beratOngkir: 0,
      showResult: false,
      not: false,
      kurirs: "",
      payments: "",
    };
  },
  async mounted() {
    try {
      var token = sessionStorage.getItem("trash");
      const paymentId = this.$route.params.id;
      const response = await apis.apis.post(
        apis.ContentPath + "/invoice",
        {
          idpayment: paymentId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      this.headers = response.data.header;
      this.products = response.data.detail;
      this.showResult = true;
      this.kurirs = response.data.header.kurir.toUpperCase();
      this.payments = response.data.header.payment_type
        .replace(/_/g, " ")
        .toUpperCase();
      var sumQTY = 0;
      var totalSub = 0;
      var ongkirs = 0;
      this.products.forEach((element) => {
        sumQTY += parseInt(element.qty);
        totalSub += parseInt(element.subtotal);
        ongkirs += parseInt(element.berat);
      });

      this.kuantitas = sumQTY;
      this.TotalHarga = totalSub;
      this.beratOngkir = ongkirs;
    } catch (error) {
      // console.error(error);
      this.not = true;
    }
  },
  methods: {
    downloadPDF() {
      const element = document.getElementById("pdf-content");

      html2pdf().set({ filename: "Invoice.pdf" }).from(element).save();
    },
  },
};
</script>
  <style>
@import url("https://fonts.cdnfonts.com/css/open-sauce-one");

.invoice {
  font-family: "Open Sauce One", sans-serif;
}

.css-gt9at0:last-child {
  page-break-after: auto;
}

@media screen and (max-width: 1024px) {
  .css-gt9at0 {
    width: auto !important;
  }
}

@media screen and (max-width: 720px) {
  .css-gt9at0 {
    width: auto !important;
  }
}

@media screen and (max-width: 430px) {
  .css-gt9at0 {
    width: 844px !important;
    -webkit-transform: scale(0.5) translate(-50%, -47%) !important;
    -ms-transform: scale(0.5) translate(-50%, -47%) !important;
    transform: scale(0.5) translate(-50%, -47%) !important;
  }
}

@media screen and (max-width: 420px) {
  .css-gt9at0 {
    width: 704px !important;
    -webkit-transform: scale(0.5) translate(-48%, -47%) !important;
    -ms-transform: scale(0.5) translate(-48%, -47%) !important;
    transform: scale(0.5) translate(-48%, -47%) !important;
  }
}

.css-gt9at0 {
  width: 800px;
  margin: auto;
  padding: 10px 20px 20px;
  -webkit-print-color-adjust: exact;
  page-break-after: always;
}

.css-1t669f0 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin: 0;
}

img {
  border-style: none;
}

.css-1t669f0 div:last-child {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-align-items: flex-end;
  -webkit-box-align: flex-end;
  -ms-flex-align: flex-end;
  align-items: flex-end;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.css-1t669f0 div:last-child h4 {
  -webkit-letter-spacing: 2px;
  -moz-letter-spacing: 2px;
  -ms-letter-spacing: 2px;
  letter-spacing: 2px;
  color: var(--N700, rgba(49, 53, 59, 0.96));
}

.css-9l4hq0-unf-heading {
  display: block;
  position: relative;
  font-weight: 800;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 16px;
  line-height: 22px;
  color: var(--color-text-low, rgba(49, 53, 59, 0.68));
  -webkit-letter-spacing: -0.1px;
  -moz-letter-spacing: -0.1px;
  -ms-letter-spacing: -0.1px;
  letter-spacing: -0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-1t669f0 div:last-child span {
  color: var(--G500, #03ac0e);
  font-size: 0.8571428571428571rem;
  font-weight: 500;
}

.css-idjlez {
  margin-top: 24px;
}

.css-8nerfl {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-aligm-items: center;
  -webkit-box-aligm: center;
  -ms-flex-aligm: center;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin: 0 0 24px;
}

.css-8nerfl > div {
  min-width: 36%;
  max-width: 48%;
}

.css-hsz7n2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: flex-start;
  -webkit-box-align: flex-start;
  -ms-flex-align: flex-start;
  align-items: flex-start;
  margin: 0 0 4px;
}

.css-hsz7n2 p {
  margin: 0;
  color: var(--N700, rgba(49, 53, 59, 0.96));
  font-size: 0.8571428571428571rem;
  font-weight: bold;
  line-height: 20px;
}

.css-hsz7n2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: flex-start;
  -webkit-box-align: flex-start;
  -ms-flex-align: flex-start;
  align-items: flex-start;
  margin: 0 0 4px;
}

.css-8nerfl .seller-section div span {
  width: 76px;
  min-width: 76px;
}

.css-hsz7n2 > span {
  color: var(--N700, rgba(49, 53, 59, 0.68));
  line-height: 20px;
  width: 115px;
  min-width: 115px;
  font-size: 0.8571428571428571rem;
}

.css-hsz7n2 p {
  margin: 0;
  color: var(--N700, rgba(49, 53, 59, 0.96));
  font-size: 0.8571428571428571rem;
  font-weight: bold;
  line-height: 20px;
}

.css-hsz7n2:last-child {
  margin-bottom: 0;
}

.css-hsz7n2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: flex-start;
  -webkit-box-align: flex-start;
  -ms-flex-align: flex-start;
  align-items: flex-start;
  margin: 0 0 4px;
}

.css-8nerfl .seller-section div span {
  width: 76px;
  min-width: 76px;
}

.css-hsz7n2 > span {
  color: var(--N700, rgba(49, 53, 59, 0.68));
  line-height: 20px;
  width: 115px;
  min-width: 115px;
  font-size: 0.8571428571428571rem;
}

.css-hsz7n2 > .additional-address {
  -webkit-align-self: flex-start;
  -ms-flex-item-align: start;
  align-self: flex-start;
}

.css-8nerfl > div {
  min-width: 36%;
  max-width: 48%;
}

.css-hsz7n2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: flex-start;
  -webkit-box-align: flex-start;
  -ms-flex-align: flex-start;
  align-items: flex-start;
  margin: 0 0 4px;
}

.css-hsz7n2 p {
  margin: 0;
  color: var(--N700, rgba(49, 53, 59, 0.96));
  font-size: 0.8571428571428571rem;
  font-weight: bold;
  line-height: 20px;
}

.css-hsz7n2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: flex-start;
  -webkit-box-align: flex-start;
  -ms-flex-align: flex-start;
  align-items: flex-start;
  margin: 0 0 4px;
}

.css-hsz7n2 > span {
  color: var(--N700, rgba(49, 53, 59, 0.68));
  line-height: 20px;
  width: 115px;
  min-width: 115px;
  font-size: 0.8571428571428571rem;
}

.css-hsz7n2 p {
  margin: 0;
  color: var(--N700, rgba(49, 53, 59, 0.96));
  font-size: 0.8571428571428571rem;
  font-weight: bold;
  line-height: 20px;
}

.css-hsz7n2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: flex-start;
  -webkit-box-align: flex-start;
  -ms-flex-align: flex-start;
  align-items: flex-start;
  margin: 0 0 4px;
}

.css-hsz7n2 > span {
  color: var(--N700, rgba(49, 53, 59, 0.68));
  line-height: 20px;
  width: 115px;
  min-width: 115px;
  font-size: 0.8571428571428571rem;
}

.css-hsz7n2 p {
  margin: 0;
  color: var(--N700, rgba(49, 53, 59, 0.96));
  font-size: 0.8571428571428571rem;
  font-weight: bold;
  line-height: 20px;
}

.css-hsz7n2:last-child {
  margin-bottom: 0;
}

.css-hsz7n2 > span {
  color: var(--N700, rgba(49, 53, 59, 0.68));
  line-height: 20px;
  width: 115px;
  min-width: 115px;
  font-size: 0.8571428571428571rem;
}

.css-hsz7n2 > .address {
  -webkit-align-self: flex-start;
  -ms-flex-item-align: start;
  align-self: flex-start;
}

.css-hsz7n2 > .address p {
  width: 100%;
  line-height: 20px;
}

.css-hsz7n2 p {
  margin: 0;
  color: var(--N700, rgba(49, 53, 59, 0.96));
  font-size: 0.8571428571428571rem;
  font-weight: bold;
  line-height: 20px;
}

.css-hsz7n2 > .address p:last-child {
  margin-left: 0.7142857142857143rem;
  font-weight: normal;
  width: 95%;
}

.css-hsz7n2 > .address p {
  width: 100%;
  line-height: 20px;
}

.css-hsz7n2 p {
  margin: 0;
  color: var(--N700, rgba(49, 53, 59, 0.96));
  font-size: 0.8571428571428571rem;
  font-weight: bold;
  line-height: 20px;
}

.css-10l0hde .header {
  padding: 18px 16px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  border: 2px solid var(--N700, #31353b);
  border-right: none;
  border-left: none;
}

.css-ij65tx {
  width: 52%;
  text-align: left;
  text-transform: uppercase;
  font-weight: bold;
  color: var(--N700, #31353b);
  font-size: 0.8571428571428571rem;
}

.css-jexylq {
  width: 8%;
  text-align: right;
  text-transform: uppercase;
  font-weight: bold;
  color: var(--N700, #31353b);
  font-size: 0.8571428571428571rem;
}

.css-zey3a2 {
  width: 20%;
  text-align: right;
  text-transform: uppercase;
  font-weight: bold;
  color: var(--N700, #31353b);
  font-size: 0.8571428571428571rem;
}

.css-zey3a2 {
  width: 20%;
  text-align: right;
  text-transform: uppercase;
  font-weight: bold;
  color: var(--N700, #31353b);
  font-size: 0.8571428571428571rem;
}

.css-10l0hde .body:last-child {
  border-bottom: thin solid #e5e7e9;
}

.css-10l0hde .body .item-product:last-child {
  border-bottom: none;
}

.css-10l0hde .body .item-product {
  border-bottom: 1px solid #e5e7e9;
}

.css-10l0hde .body .item-product > .section-product {
  padding: 14px 16px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: flex-start;
  -webkit-box-align: flex-start;
  -ms-flex-align: flex-start;
  align-items: flex-start;
}

.css-14anr17 {
  width: 52%;
  font-size: 0.8571428571428571rem;
}

.css-10l0hde .body .item-product a {
  color: var(--G500, #03ac0e);
  font-size: 1rem;
}

.css-1oovswe-unf-heading {
  display: inline-block;
  position: relative;
  font-weight: 700;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 14px;
  line-height: 18px;
  color: var(--G500, #03ac0e);
  -webkit-letter-spacing: 0.1px;
  -moz-letter-spacing: 0.1px;
  -ms-letter-spacing: 0.1px;
  letter-spacing: 0.1px;
  -webkit-text-decoration: none;
  text-decoration: none;
  margin: 0;
}

.css-10l0hde .body .item-product .info-product {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin: 2px 0 0;
  white-space: nowrap;
}

.css-10l0hde .body .item-product .info-product__item:first-child {
  padding-left: 0;
}

.css-10l0hde .body .item-product .info-product__item {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 8px;
  position: relative;
}

.css-10l0hde .body .item-product .info-product__item p {
  color: var(--N700, rgba(49, 53, 59, 0.68));
}

.css-1gew4m0-unf-heading {
  display: block;
  position: relative;
  font-weight: 400;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-text-low, rgba(49, 53, 59, 0.68));
  -webkit-letter-spacing: 0.1px;
  -moz-letter-spacing: 0.1px;
  -ms-letter-spacing: 0.1px;
  letter-spacing: 0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-10l0hde .body .item-product .info-product__item p:last-child {
  color: var(--N700, rgba(49, 53, 59, 0.96));
}

.css-10l0hde .body .item-product .info-product__item p {
  color: var(--N700, rgba(49, 53, 59, 0.68));
}

.css-1gew4m0-unf-heading {
  display: block;
  position: relative;
  font-weight: 400;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-text-low, rgba(49, 53, 59, 0.68));
  -webkit-letter-spacing: 0.1px;
  -moz-letter-spacing: 0.1px;
  -ms-letter-spacing: 0.1px;
  letter-spacing: 0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-1cidalh {
  width: 8%;
  text-align: right;
  font-size: 0.8571428571428571rem;
}

.css-19x7ige-unf-heading {
  display: block;
  position: relative;
  font-weight: 400;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: #343030;
  -webkit-letter-spacing: 0.1px;
  -moz-letter-spacing: 0.1px;
  -ms-letter-spacing: 0.1px;
  letter-spacing: 0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-q4cgqg {
  width: 20%;
  text-align: right;
  font-size: 0.8571428571428571rem;
}

.css-19x7ige-unf-heading {
  display: block;
  position: relative;
  font-weight: 400;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: #343030;
  -webkit-letter-spacing: 0.1px;
  -moz-letter-spacing: 0.1px;
  -ms-letter-spacing: 0.1px;
  letter-spacing: 0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-q4cgqg {
  width: 20%;
  text-align: right;
  font-size: 0.8571428571428571rem;
}

.css-19x7ige-unf-heading {
  display: block;
  position: relative;
  font-weight: 400;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: #343030;
  -webkit-letter-spacing: 0.1px;
  -moz-letter-spacing: 0.1px;
  -ms-letter-spacing: 0.1px;
  letter-spacing: 0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-1bbsain {
  display: block;
  margin: 0 0 0 auto;
  width: 47%;
}

.css-1bbsain .total.first.ppn {
  border-bottom: none;
}

.css-1bbsain .total.first {
  border-top: none;
}

.css-1bbsain .ppn {
  border-bottom: thin dashed var(--N75, #e5e7e9);
  padding-bottom: 8px;
}

.css-1bbsain .total {
  border-bottom: thin dashed var(--N75, #e5e7e9);
  border-top: thin dashed var(--N75, #e5e7e9);
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 8px 16px 8px 0;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.css-1bbsain .total h6 {
  text-transform: uppercase;
}

.css-1bbsain .total h5,
.css-1bbsain .total h6 {
  color: #343030;
}

.css-1bbsain .total > * {
  font-weight: bold;
}

.css-1bgsywi-unf-heading {
  display: block;
  position: relative;
  font-weight: 800;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 12px;
  line-height: 18px;
  color: var(--color-text-low, rgba(49, 53, 59, 0.68));
  -webkit-letter-spacing: -0.1px;
  -moz-letter-spacing: -0.1px;
  -ms-letter-spacing: -0.1px;
  letter-spacing: -0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-1bbsain .total h5,
.css-1bbsain .total h6 {
  color: #343030;
}

.css-1bbsain .total > * {
  font-weight: bold;
}

.css-ep750o-unf-heading {
  display: block;
  position: relative;
  font-weight: 800;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-low, rgba(49, 53, 59, 0.68));
  -webkit-letter-spacing: -0.1px;
  -moz-letter-spacing: -0.1px;
  -ms-letter-spacing: -0.1px;
  letter-spacing: -0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-1bbsain .item-payment {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin: 8px 0;
  padding: 0 16px 0 0;
}

.css-1bbsain .item-payment p {
  color: #343030;
}

.css-1gew4m0-unf-heading {
  display: block;
  position: relative;
  font-weight: 400;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-text-low, rgba(49, 53, 59, 0.68));
  -webkit-letter-spacing: 0.1px;
  -moz-letter-spacing: 0.1px;
  -ms-letter-spacing: 0.1px;
  letter-spacing: 0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-1bbsain .item-payment p {
  color: #343030;
}

.css-1gew4m0-unf-heading {
  display: block;
  position: relative;
  font-weight: 400;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-text-low, rgba(49, 53, 59, 0.68));
  -webkit-letter-spacing: 0.1px;
  -moz-letter-spacing: 0.1px;
  -ms-letter-spacing: 0.1px;
  letter-spacing: 0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-1bbsain .ppn {
  border-bottom: thin dashed var(--N75, #e5e7e9);
  padding-bottom: 8px;
}

.css-1bbsain .total {
  border-bottom: thin dashed var(--N75, #e5e7e9);
  border-top: thin dashed var(--N75, #e5e7e9);
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 8px 16px 8px 0;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.css-1bbsain .total h6 {
  text-transform: uppercase;
}

.css-1bbsain .total h5,
.css-1bbsain .total h6 {
  color: #343030;
}

.css-1bbsain .total > * {
  font-weight: bold;
}

.css-1bgsywi-unf-heading {
  display: block;
  position: relative;
  font-weight: 800;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 12px;
  line-height: 18px;
  color: var(--color-text-low, rgba(49, 53, 59, 0.68));
  -webkit-letter-spacing: -0.1px;
  -moz-letter-spacing: -0.1px;
  -ms-letter-spacing: -0.1px;
  letter-spacing: -0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-1bbsain .total h5,
.css-1bbsain .total h6 {
  color: #343030;
}

.css-1bbsain .total > * {
  font-weight: bold;
}

.css-ep750o-unf-heading {
  display: block;
  position: relative;
  font-weight: 800;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-low, rgba(49, 53, 59, 0.68));
  -webkit-letter-spacing: -0.1px;
  -moz-letter-spacing: -0.1px;
  -ms-letter-spacing: -0.1px;
  letter-spacing: -0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-1bbsain .item-payment {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin: 8px 0;
  padding: 0 16px 0 0;
}

.css-1bbsain .item-payment p {
  color: #343030;
}

.css-1gew4m0-unf-heading {
  display: block;
  position: relative;
  font-weight: 400;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-text-low, rgba(49, 53, 59, 0.68));
  -webkit-letter-spacing: 0.1px;
  -moz-letter-spacing: 0.1px;
  -ms-letter-spacing: 0.1px;
  letter-spacing: 0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-1bbsain .item-payment p {
  color: #343030;
}

.css-1gew4m0-unf-heading {
  display: block;
  position: relative;
  font-weight: 400;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-text-low, rgba(49, 53, 59, 0.68));
  -webkit-letter-spacing: 0.1px;
  -moz-letter-spacing: 0.1px;
  -ms-letter-spacing: 0.1px;
  letter-spacing: 0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-1bbsain .item-payment {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin: 8px 0;
  padding: 0 16px 0 0;
}

.css-1bbsain .item-payment p {
  color: #343030;
}

.css-1gew4m0-unf-heading {
  display: block;
  position: relative;
  font-weight: 400;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-text-low, rgba(49, 53, 59, 0.68));
  -webkit-letter-spacing: 0.1px;
  -moz-letter-spacing: 0.1px;
  -ms-letter-spacing: 0.1px;
  letter-spacing: 0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-1bbsain .item-payment p {
  color: #343030;
}

.css-1gew4m0-unf-heading {
  display: block;
  position: relative;
  font-weight: 400;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-text-low, rgba(49, 53, 59, 0.68));
  -webkit-letter-spacing: 0.1px;
  -moz-letter-spacing: 0.1px;
  -ms-letter-spacing: 0.1px;
  letter-spacing: 0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-1bbsain .total:last-child {
  border-bottom: none;
}

.css-1bbsain .ppn {
  border-bottom: thin dashed var(--N75, #e5e7e9);
  padding-bottom: 8px;
}

.css-1bbsain .total {
  border-bottom: thin dashed var(--N75, #e5e7e9);
  border-top: thin dashed var(--N75, #e5e7e9);
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 8px 16px 8px 0;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.css-1bbsain .total h6 {
  text-transform: uppercase;
}

.css-1bbsain .total h5,
.css-1bbsain .total h6 {
  color: #343030;
}

.css-1bbsain .total > * {
  font-weight: bold;
}

.css-1bgsywi-unf-heading {
  display: block;
  position: relative;
  font-weight: 800;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 12px;
  line-height: 18px;
  color: var(--color-text-low, rgba(49, 53, 59, 0.68));
  -webkit-letter-spacing: -0.1px;
  -moz-letter-spacing: -0.1px;
  -ms-letter-spacing: -0.1px;
  letter-spacing: -0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-1bbsain .total h5,
.css-1bbsain .total h6 {
  color: #343030;
}

.css-1bbsain .total > * {
  font-weight: bold;
}

.css-ep750o-unf-heading {
  display: block;
  position: relative;
  font-weight: 800;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-low, rgba(49, 53, 59, 0.68));
  -webkit-letter-spacing: -0.1px;
  -moz-letter-spacing: -0.1px;
  -ms-letter-spacing: -0.1px;
  letter-spacing: -0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-hkvvch {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: flex-start;
  -webkit-box-align: flex-start;
  -ms-flex-align: flex-start;
  align-items: flex-start;
  border-top: 1px solid #e5e7e9;
  padding: 20px 0 0;
}

.css-hkvvch .col-shipping:first-child {
  width: 53%;
  padding-right: 50px;
}

.css-hkvvch .col-shipping {
  width: 47%;
}

.css-hkvvch .item-shipping {
  margin: 0 0 14px;
}

.css-hkvvch .item-shipping p {
  color: var(--N700, rgba(49, 53, 59, 0.68));
  margin: 0 0 6px;
}

.css-1gew4m0-unf-heading {
  display: block;
  position: relative;
  font-weight: 400;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-text-low, rgba(49, 53, 59, 0.68));
  -webkit-letter-spacing: 0.1px;
  -moz-letter-spacing: 0.1px;
  -ms-letter-spacing: 0.1px;
  letter-spacing: 0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-hkvvch .item-shipping .desc {
  margin: 0 0 8px;
}

.css-hkvvch .item-shipping .desc h6 {
  color: #343030;
  margin: 0 0 6px;
}

.css-1bgsywi-unf-heading {
  display: block;
  position: relative;
  font-weight: 800;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 12px;
  line-height: 18px;
  color: var(--color-text-low, rgba(49, 53, 59, 0.68));
  -webkit-letter-spacing: -0.1px;
  -moz-letter-spacing: -0.1px;
  -ms-letter-spacing: -0.1px;
  letter-spacing: -0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-hkvvch .col-shipping {
  width: 47%;
}

.css-hkvvch .item-shipping {
  margin: 0 0 14px;
}

.css-hkvvch .item-shipping p {
  color: var(--N700, rgba(49, 53, 59, 0.68));
  margin: 0 0 6px;
}

.css-1gew4m0-unf-heading {
  display: block;
  position: relative;
  font-weight: 400;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-text-low, rgba(49, 53, 59, 0.68));
  -webkit-letter-spacing: 0.1px;
  -moz-letter-spacing: 0.1px;
  -ms-letter-spacing: 0.1px;
  letter-spacing: 0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-hkvvch .item-shipping .desc {
  margin: 0 0 8px;
}

.css-hkvvch .item-shipping .desc h6 {
  color: #343030;
  margin: 0 0 6px;
}

.css-1bgsywi-unf-heading {
  display: block;
  position: relative;
  font-weight: 800;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 12px;
  line-height: 18px;
  color: var(--color-text-low, rgba(49, 53, 59, 0.68));
  -webkit-letter-spacing: -0.1px;
  -moz-letter-spacing: -0.1px;
  -ms-letter-spacing: -0.1px;
  letter-spacing: -0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-y9aaky {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: flex-end;
  -webkit-box-align: flex-end;
  -ms-flex-align: flex-end;
  align-items: flex-end;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin: 50px 0 0;
}

.css-y9aaky p {
  color: var(--N700, rgba(49, 53, 59, 0.96));
}

.css-1gew4m0-unf-heading {
  display: block;
  position: relative;
  font-weight: 400;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-text-low, rgba(49, 53, 59, 0.68));
  -webkit-letter-spacing: 0.1px;
  -moz-letter-spacing: 0.1px;
  -ms-letter-spacing: 0.1px;
  letter-spacing: 0.1px;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}

.css-y9aaky p a {
  font-size: 0.8571428571428571rem;
}

.css-1wdgrjm-unf-heading {
  display: inline-block;
  position: relative;
  font-weight: 700;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, Roboto,
    sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: var(--G500, #03ac0e);
  -webkit-letter-spacing: 0.1px;
  -moz-letter-spacing: 0.1px;
  -ms-letter-spacing: 0.1px;
  letter-spacing: 0.1px;
  -webkit-text-decoration: none;
  text-decoration: none;
  margin: 0;
}

.css-y9aaky span {
  font-style: italic;
  font-size: 0.8571428571428571rem;
  color: var(--N700, rgba(49, 53, 59, 0.96));
}

div#TopLevelWrapper {
  max-width: none !important;
}

.css-usuaic {
  max-width: 500px;
  margin: 0 auto;
}

.css-ts6vuj {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  background: var(--N0, #ffffff);
  box-shadow: 0 -1px 7px 0 rgba(0, 0, 0, 0.15);
  top: 0;
  left: 0;
  position: -webkit-sticky;
  position: sticky;
  padding: 8px 16px;
  width: 100%;
  z-index: 100;
}

.css-ts6vuj .left-section {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}

.css-ts6vuj .left-section .btn-back {
  display: none;
}

.css-ts6vuj .left-section .invoice-label {
  display: none;
  margin-left: 8px;
  font-size: 16px;
  font-weight: bold;
  color: var(--N700, #31353b);
}

.css-ts6vuj .right-section {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding-right: 1rem;
}

.css-ts6vuj .right-section .btn-download {
  display: none;
}

.css-w29su3-unf-btn {
  width: auto;
  height: 32px;
  color: var(--NN1000, #ffffff);
  font-size: 12px;
  font-weight: 800;
  line-height: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  outline: none;
  background-position: center;
  border-radius: 8px;
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  padding: 0 16px;
  -webkit-transition: background 300ms, border 300ms, color 300ms;
  transition: background 300ms, border 300ms, color 300ms;
  background: var(--GN500, #00aa5b);
  border: none;
  font-family: inherit;
}

.css-6k8nk {
  min-width: 0;
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  bottom: 0;
  opacity: 1;
  -webkit-transition: opacity 300ms cubic-bezier(0.63, 0.01, 0.29, 1),
    bottom 300ms cubic-bezier(0.63, 0.01, 0.29, 1);
  transition: opacity 300ms cubic-bezier(0.63, 0.01, 0.29, 1),
    bottom 300ms cubic-bezier(0.63, 0.01, 0.29, 1);
}

.css-1e63sol:last-of-type {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-flex-shrink: 1;
  -ms-flex-negative: 1;
  flex-shrink: 1;
}

.css-1e63sol {
  white-space: pre;
}

div#TopLevelWrapper {
  max-width: none !important;
}

.css-usuaic {
  max-width: 500px;
  margin: 0 auto;
}
</style>
  