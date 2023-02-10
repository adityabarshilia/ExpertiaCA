import { connect } from "@/db.connect";
import { UserModel } from "@/models/user.model";

export default async function handler(req, res) {
  const { method } = req;
  const { id, task } = req.body;

  //Connecting to Database
  try {
    await connect();
  } catch (e) {
    console.log(e);
  }

  if (method === "PATCH") {
    if (!id) return res.status(400).send("No user id provided");
    try {
      let data = await UserModel.updateOne(
        { _id: id },
        { $push: { tasks: task } }
      );

      res.status(200).send(data);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
}
