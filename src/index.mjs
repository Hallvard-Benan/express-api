import mongoose from "mongoose";
import cors from "cors";
import { createApp } from "./createApp.mjs";
// import "./strategies/discord-strategy.mjs";
import { config } from "dotenv";
config({ path: ".env.local" });

mongoose
  .connect(process.env.DATABASE_CONNECTION_STRING)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("error", err);
  });
const app = createApp();

app.use(cors());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express js is running on port ${port}`);
});
