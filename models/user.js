import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});


export const Users = mongoose.model("User", schema);