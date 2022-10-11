import mongoose from "mongoose";

export default () => {
  function connect() {
    const { MONGO_URL, MONGO_USER, MONGO_PASSWORD } = process.env;
    mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}`,
      (err) => {
        if (err) {
          console.error("mongodb connection error", err);
        }
        console.log("mongodb connected");
      }
    );
  }
  connect();
  mongoose.connection.on("disconnected", connect);
};
