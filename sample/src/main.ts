import { GeotabApi } from "adv-mg-api-js";

const api = new GeotabApi({
  userName: "asdfas",
  password: "Asdfasd",
  database: "asdafdasd",
});

async function run() {
  await api.call("Get", {});
}
