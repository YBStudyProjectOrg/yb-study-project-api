import express from "express";
import * as ctrlContent from "./content.ctrl";
const content = express.Router();

content.post("/write", ctrlContent.write);
content.post("/modifiy", ctrlContent.modifiy);

export default content;
