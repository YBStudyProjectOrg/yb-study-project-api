import express from "express";
import dbconnection from "./dbconnection";
import livereloadMiddleware from "connect-livereload";
import livereload from "livereload";
import { auth } from "@API";
import jwtMiddleware from "@/lib/jwtMiddleware";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 4000;

dbconnection();

livereload
  .createServer({
    exts: ["html", "css", "ejs"],
    debug: true,
  })
  .watch(__dirname);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware
app.use(livereloadMiddleware());
app.use(jwtMiddleware);

// routes
app.use("/api/auth", auth);
