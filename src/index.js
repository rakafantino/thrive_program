import "./configs/env.js";
import express from "express";
import userRoute from "./users/users.routes.js";
import authRoute from "./auth/auth.routes.js";
import communityRoute from "./community/community.routes.js";
import joinRoute from "./join_community/join_community.routes.js";
import eventRoute from "./events/events.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoute);
app.use("/", authRoute);
app.use("/community", communityRoute);
app.use("/community", joinRoute);
app.use("/community", eventRoute);

// start server
app.listen(process.env.API_PORT, () => {
  console.log(`Express API is listening on port ${process.env.API_PORT}`);
});
