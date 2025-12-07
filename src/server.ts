import { app } from "./app";
import { env } from "./infra/config/env";

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log("Port 3000 running");
  });
