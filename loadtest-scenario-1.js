import http from "k6/http";

const serviceNames = [
  "scenario 1 service 1",
  "scenario 1 service-2",
  "scenario 1 service_3",
];
const levels = ["info"];

export const options = {
  vus: 10,
  iterations: 5000,
};

export default function () {
  http.post(
    "http://skripsi.audipasuatmadi.com/v1/ingest",
    JSON.stringify({
      level: levels[Math.floor(Math.random() * levels.length)],
      app_name: serviceNames[Math.floor(Math.random() * serviceNames.length)],
      data: "tes pesan",
    })
  );
}
