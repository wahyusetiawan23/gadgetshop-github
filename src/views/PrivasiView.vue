<template>
  <div>
    <navbar-component />
    <section class="terms">
      <div class="container">
        <div class="header-terms">
          <h1>Kebijakan Privasi</h1>
        </div>
        <div class="subhead">
          <p>Selamat datang di www.gadgetshop.co.id</p>
          <p>
            Kami menghargai privasi Anda dan berkomitmen untuk melindungi
            informasi pribadi yang Anda berikan kepada kami saat menggunakan
            layanan kami. Kebijakan privasi ini menjelaskan bagaimana kami
            mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.
            Kami mendorong Anda untuk membaca kebijakan ini dengan seksama untuk
            memahami praktik kami dalam mengelola informasi pribadi Anda.
          </p>
        </div>
        <div class="content">
          <div class="header-content">
            <h2>A. Informasi yang Kami Kumpulkan</h2>
          </div>
          <div class="list">
            <ol>
              <li>
                Informasi Pribadi: Saat Anda mendaftar sebagai pengguna atau
                melakukan transaksi di situs kami, kami dapat mengumpulkan
                informasi pribadi seperti nama, alamat, alamat email, nomor
                telepon, dan informasi pembayaran.
              </li>
              <li>
                Informasi Penggunaan: Kami juga dapat mengumpulkan informasi
                tentang bagaimana Anda menggunakan situs kami, termasuk data
                tentang aktivitas browsing Anda, preferensi produk, dan riwayat
                transaksi.
              </li>
            </ol>
          </div>
          <div class="header-content">
            <h2>B. Penggunaan Informasi</h2>
          </div>
          <div class="list">
            <ol>
              <li>Kami menggunakan informasi yang dikumpulkan untuk:</li>
              <ol>
                <li>Memproses dan mengirimkan pesanan yang Anda lakukan.</li>
                <li>
                  Mengelola akun pengguna Anda dan menyediakan layanan
                  pelanggan.
                </li>
                <li>
                  Meningkatkan dan mengoptimalkan situs kami serta pengalaman
                  pengguna.
                </li>
              </ol>
            </ol>
          </div>
          <div class="header-content">
            <h2>C. Keamanan Informasi</h2>
          </div>
          <div class="list">
            <ol>
              <li>
                Kami mengambil langkah-langkah yang wajar untuk melindungi
                informasi pribadi Anda dari akses yang tidak sah, penggunaan
                yang tidak sah, perubahan, atau pengungkapan yang tidak sah.
              </li>
              <li>
                Kami menggunakan protokol enkripsi dan teknologi keamanan
                lainnya untuk melindungi data sensitif saat dikirimkan melalui
                situs kami.
              </li>
            </ol>
          </div>
          <div class="header-content">
            <h2>D. Perlindungan Privasi Anak-Anak</h2>
          </div>
          <div class="list">
            <ol>
              <li>
                Situs kami tidak ditujukan untuk anak di bawah usia 18 tahun.
                Kami tidak secara sengaja mengumpulkan informasi pribadi dari
                anak di bawah usia tersebut.
              </li>
              <li>
                Jika kami mengetahui bahwa kami telah mengumpulkan informasi
                pribadi dari anak di bawah usia tersebut tanpa persetujuan orang
                tua, kami akan segera menghapus informasi tersebut dari server
                kami.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import NavbarComponent from "@/components/NavbarComponent.vue";
export default {
  components: { NavbarComponent },
  metaInfo() {
    return {
      title: "Kebijakan Privasi",
    };
  },
};
</script>
<style>
@import url("https://fonts.cdnfonts.com/css/open-sauce-one");
.terms {
  margin-top: 50px;
  margin-bottom: 50px;
  color: #212121;
  font-family: "Open Sauce One", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
@media (min-width: 1400px) {
  .terms .container {
    max-width: 920px;
  }
}
.list li,
.subhead p {
  font-size: 14px;
  text-align: justify;
  line-height: 1.5;
}
.header-terms h1 {
  font-size: 2.71429rem;
  margin-bottom: 30px;
}

.header-content h2 {
  font-size: 1.51429rem;
  margin: 36px 0px 10px;
}
ol > ol {
  list-style: lower-alpha;
}

.s-info {
  font-weight: 500;
  font-style: italic;
}
</style>