import express from "express";
import "./db/mongoose.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/api/v1", ApiRoutes);

app.listen(port, () => {
  console.log("runninng on " + port);
});
