import { useState } from "react";
import Link from "next/link";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const Signin = () => {
  const [hidePass, setHidePass] = useState(true);

  return (
    <div className="flex flex-row items-center justify-center lg:justify-between py-20 px-7 bg-[#faf9f9]">
      <div className="ml-[0px] lg:ml-[80px] border-[0.5px] rounded-[10px] border-[#cfcfcf] bg-white">
        <form className="max-w-[500px] py-10 px-8">
          <p className="text-[25px] leading-[37.5px] mb-4 font-light">
            Welcome !
          </p>
          <h1 className="text-[31px] leading-[46.5px] font-[600]">
            Sign in to
          </h1>
          <p className="mb-[35px] text-base">Lorem Ipsum is simply</p>
          <label>User name</label>
          <input
            required
            type="text"
            className="mb-4 p-7 border-[0.6px] mt-[10px] rounded-[6px] border-[#888888] h-10 w-full"
            placeholder="Enter your username"
          />
          <label>Password</label>
          <div className="relative">
            <input
              required
              type={hidePass ? "password" : "text"}
              className="mb-4 p-7 border-[0.6px] mt-[10px] rounded-[6px] border-[#888888] h-10 w-full"
              placeholder="Enter your password"
            />

            {hidePass ? (
              <BsEyeSlashFill
                onClick={() => setHidePass(!hidePass)}
                fontSize="23"
                className="absolute top-[28px] right-[25px] cursor-pointer"
              />
            ) : (
              <BsEyeFill
                onClick={() => setHidePass(!hidePass)}
                fontSize="23"
                className="absolute top-[28px] right-[25px] cursor-pointer"
              />
            )}
          </div>

          <div className="flex justify-between items-center mt-2 mb-6">
            <div className="flex justify-center items-center gap-[7px]">
              <input className="cursor-pointer" type="checkbox" id="rememberme" name="rememberme" />
              <label className="text-[12px] leading-[18px]" for="rememberme">
                Remember me
              </label>
            </div>
            <p className="text-[12px] leading-[18px] cursor-pointer">Forgot password ?</p>
          </div>

          <input
            type="submit"
            className="text-lg my-2 p-4 transition-all border-[0.6px] rounded-[6px] border-[#888888] w-full bg-black text-white hover:bg-white cursor-pointer hover:text-black hover hover:border-black"
            value="Login"
          />

          <p className="mt-[20px] text-center text-[#7D7D7D] w-full">
            Don't have an account ? {"  "}
            <Link href="/signup" className="text-[#000000] font-bold">
              Register
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden lg:flex items-center justify-center w-[700px] h-[600px]">
        <img src="/people.png" alt="people" className="w-full" />
      </div>
    </div>
  );
};

export default Signin;
