import { useState } from "react";
import Link from "next/link";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const Dashboard = () => {
  const [hidePass, setHidePass] = useState(true);

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh] p-5">
      <div className="p-7 max-w-[505px] border-[0.5px] rounded-[10px] shadow-[0_4px_64px_rgba(0,0,0,0.05)] border-[#cfcfcf] bg-white">
        <p className="text-[25px] leading-[37.5px] mb-4 font-light">Hello</p>
        <h1 className="text-[31px] leading-[46.5px] mb-4 font-[600]">John Doe</h1>
        <p className="mb-[40px]">Good to see you here!</p>
        <h3 className="font-bold">Tasks for 24th Dec, 2022 :</h3>

        <input
          required
          type="text"
          className="mb-4 p-4 border-[0.6px] mt-[10px] rounded-[6px] border-[#888888] w-full"
          placeholder="Eg. Need to finish my assignment..."
        />

        <input
          type="submit"
          className="text-lg my-2 p-4 transition-all border-[0.6px] rounded-[6px] border-[#888888] w-full bg-black text-white hover:bg-white cursor-pointer hover:text-black hover hover:border-black"
          value="Add New Task"
        />

        <button className="mt-2 text-[14px] leading-[21px] font-semibold m-auto block">Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
