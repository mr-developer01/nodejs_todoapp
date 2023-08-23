import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "TODO-API",
    }).then(() => console.log("DataBase is connected!!")).catch((e) => console.log(e));
};