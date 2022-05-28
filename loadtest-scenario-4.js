import grpc from "k6/net/grpc";

const serviceNames = [
  "scenario 4 service 1",
  "scenario 4 service-2",
  "scenario 4 service_3",
];
const levels = ["info"];

export const options = {
  vus: 10,
  iterations: 10000,
};

const client = new grpc.Client();
client.load(["."], "ingestor.proto");

export default function () {
  client.connect("skripsi.audipasuatmadi.com:30010", {
    plaintext: true,
  });

  const data = {
    level: levels[Math.floor(Math.random() * levels.length)],
    app_name: serviceNames[Math.floor(Math.random() * serviceNames.length)],
    data: "tes pesan",
  };

  client.invoke("proto.IngestorService/SendEventLog", data);
  client.close();
}
