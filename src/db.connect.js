import mongoose from "mongoose";

//Connecting to MongoDB
export const connect = async () => {
  if(mongoose.connection.readyState[0]) return; //Prevent multiple connections
  mongoose.connect(process.env.MONGODB_URI);
};