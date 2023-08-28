import mongoose from "mongoose";
const connectionUrl =
  "mongodb://127.0.0.1:27017/interior-empourium" || process.env.MONGODB;

mongoose
  .connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection succesful");
  })
  .catch((err) => {
    console.log("connection fail", err);
  });
