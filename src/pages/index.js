import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContextProvider";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { connect } from "@/db.connect";
import { UserModel } from "@/models/user.model";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let date = new Date();
let currDate = `${date.getDate()}${
  months[date.getMonth()]
}${date.getFullYear()}`;

const Dashboard = ({ oldTasks }) => {
  const [str, setStr] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();

  const data = jwt.decode(auth.token); //get details from token

  let Tasks = [...oldTasks];
  Tasks = Tasks.reduce((a, e) => [...a, e.name], []);

  const logout = () => {
    setAuth("");
    toast.success("You're logged out")
  };

  useEffect(() => {
    if (!auth) router.push("/signup");
  }, [auth]);

  const updateTasks = async () => {
    const { id } = data;
    await axios.patch("/api/tasks", {
      id,
      task: { name: str, created: currDate },
    });
    router.push(`/?id=${id}`);
    toast.success("Task added!");
  };

  return (
    <div className="flex items-center justify-center min-h-[100vh] p-5">
      <div>
        <Toaster />
      </div>
      <div className="p-7 max-w-[505px] border-[0.5px] rounded-[10px] shadow-[0_4px_64px_rgba(0,0,0,0.05)] border-[#cfcfcf] bg-white">
        <p className="text-[25px] leading-[37.5px] mb-4 font-light">Hello</p>
        <h1 className="text-[31px] leading-[46.5px] mb-4 font-[600]">
          {data?.username}
        </h1>
        <p className="mb-[40px]">Good to see you here!</p>
        <h3 className="font-bold">
          Tasks for {date.getDate()}th {months[date.getMonth()]},{" "}
          {date.getFullYear()}
        </h3>

        <ul className="m-7 list-disc">
          {Tasks.map((el) => (
            <li key={el}>{el}</li>
          ))}
        </ul>

        <input
          value={str}
          onChange={({ target }) => setStr(target.value)}
          required
          type="text"
          className="mb-4 p-4 border-[0.6px] mt-[10px] rounded-[6px] border-[#888888] w-full"
          placeholder="Eg. Need to finish my assignment..."
        />

        <input
          onClick={() => {
            if (Tasks.length === 5) return toast.error("Daily limit exceeded");
            setStr("");
            updateTasks();
          }}
          type="submit"
          className="text-lg my-2 p-4 transition-all border-[0.6px] rounded-[6px] border-[#888888] w-full bg-black text-white hover:bg-white cursor-pointer hover:text-black hover hover:border-black"
          value="Add New Task"
        />

        <button
          type="submit"
          onClick={logout}
          className="mt-2 text-[14px] leading-[21px] font-semibold m-auto block"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  const { id } = query;
  let oldTasks;

  try {
    await connect();
  } catch (e) {
    console.log(e);
  }

  try {
    //removing tasks not of the same day
    await UserModel.updateOne(
      { _id: id },
      { $pull: { tasks: { created: { $ne: currDate } } } }
    );

    const user = await UserModel.findOne({ _id: id });
    oldTasks = user.tasks;
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      oldTasks,
    },
  };
};

export default Dashboard;
