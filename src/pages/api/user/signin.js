import { connect } from "@/db.connect";
import { UserModel } from "@/models/user.model";
import argon2id from "argon2";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;
  const { username, password } = req.body;

  //Connecting to Database
  try {
    await connect();
  } catch (e) {
    console.log(e);
  }

  if (method === "POST") {
    try {
      const user = await UserModel.findOne({ username });

      //Check if user exists
      if (user) {
        //Verifying the hashed password
        if (!(await argon2id.verify(user.password, password))) {
          return res.status(401).send({ message: "Invalid password" });
        }


        //Creating a JWT token
        const token = jwt.sign(
          { id: user._id, username: user.username },
          process.env.TSEC,
          {
            expiresIn: process.env.TL,
          }
        );

        const response = {
          message: "Logged in",
          token: token,
        };

        res.status(200).send(response);
      } else {
        return res.status(401).send({ message: "User not found" });
      }
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
}
