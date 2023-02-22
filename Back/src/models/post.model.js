import mongoose from "mongoose";

const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    title: { type: String, required: [true, "el campo es obligatorio"] },
    description: { type: String, required: [true, "el campo es obligatorio"] },
    imgUrl: { type: String, required: [true, "el campo es obligatorio"] },
  },
  { timestamps: true }
);

export const postModel = model("post", postSchema);
