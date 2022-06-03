import http from "k6/http";

const serviceNames = [
  "scenario 3 service 1",
  "scenario 3 service-2",
  "scenario 3 service_3",
];
const levels = ["info", "error"];
const errorMessages = [
  "[Transaksi]: terdapat error pada baris ke 14, oleh user id 124, dengan pesan error: redis tidak dapat diakses",
  "[Get Profile Data]: terdapat error pada baris ke 156, oleh user id 221, dengan pesan error: user tidak terotentikasi",
  "[Checkout Voucher]: terdapat error pada baris ke 21, oleh user id 132, voucher id 72102, dengan pesan error: id voucher tidak ditemukan pada basis data",
  "[Logout User]: terdapat error pada baris ke 23, oleh user id 121, dengan pesan error: token sudah kadaluarsa",
  "[Kirim Pesan]: terdapat error pada baris ke 122, oleh user id 2, dan user id 43, dengan pesan error: provider pesan tidak dapat dihubungi: 500 error",
];

const infoMessages = [
  "[Get Items]: terdapat request dari user 123 untuk mendapatkan detail dari item dengan id 21",
  "[Kirim Pesan]: terdapat pesan yang dikirim dari user 122 ke user 2 secara sukses",
  "[Transaksi]: terdapat transaksi oleh user id 124 dengan berhasil",
  "[Checkout Voucher]: terdapat aktivitas checkout voucher dari user id 132 untuk voucher id 72102 dengan sukses",
  "[Get Profile Data]: terdapat request dari user id 221 untuk mendapatkan profile data user id 221 secara berhasil",
];

export const options = {
  vus: 10,
  iterations: 10000,
};

export default function () {
  const level = levels[Math.floor(Math.random() * levels.length)];
  let msg;
  if (level == "info") {
    msg = infoMessages[Math.floor(Math.random() * infoMessages.length)];
  } else if (level == "error") {
    msg = errorMessages[Math.floor(Math.random() * errorMessages.length)];
  }

  http.post(
    "http://skripsi.audipasuatmadi.com/v1/ingest",
    JSON.stringify({
      level: level,
      app_name: serviceNames[Math.floor(Math.random() * serviceNames.length)],
      data: msg,
    })
  );
}
