import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContextProvider";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [str, setStr] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();
  const data = jwt.decode(auth.token);

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

  const logout = () => {
    setAuth("");
  };

  useEffect(() => {
    if (!auth) router.push("/signup");
  });

  return (
    <div className="flex items-center justify-center min-h-[100vh] p-5">
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
          {tasks.map((el) => (
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
            setStr("")
            if (tasks.length < 5) setTasks([...tasks, str]);
            else alert("Daily limit exceeded");
          }}
          type="submit"
          className="text-lg my-2 p-4 transition-all border-[0.6px] rounded-[6px] border-[#888888] w-full bg-black text-white hover:bg-white cursor-pointer hover:text-black hover hover:border-black"
          value="Add New Task"
        />

        <button
          onClick={logout}
          className="mt-2 text-[14px] leading-[21px] font-semibold m-auto block"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
