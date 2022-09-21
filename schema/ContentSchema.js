import mongoose, { Schema } from "mongoose";

const ContentSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ author: String, body: String, date: Date }],
  hidden: Boolean,  // 숨김기능 삭제는 그냥 바로 삭제.
  views: Number,
  meta: {
    tags: String,   // 있으면 좋을꺼 같은디?
    votes: Number,  // 쓸일이 있을까??
    favs: Number   // 있으면 좋지 뭐...
  },
  registdate: { type: Date, default: Date.now },
  modifydate: { type: Date, default: Date.now }
});

const content = mongoose.model("CONTENT", ContentSchema);

export default content;
