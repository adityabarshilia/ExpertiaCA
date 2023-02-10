import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContextProvider";
import jwt from "jsonwebtoken";

const Signup = () => {
  const [hidePass, setHidePass] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();

  //Form Inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if(auth.token) {
      const user = jwt.decode(auth.token);
      router.push(`/?id=${user.id}`);
    }
  },[auth]) 

  const SignIn = async () => {
    let res = await axios.post("/api/user/signin", {
      username,
      password,
    });
    if (res.data.message == "Logged in") setAuth(res.data);
  };

  const signUpRequest = async (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      try {
        let res = await axios.post("/api/user/signup", {
          username,
          email,
          password,
        });
        if (res.data.user) {
          SignIn();
          alert("Signup successful!");
        }
      } catch (err) {
        alert(err.response.data.message);
      }
    } else alert("Passwords do not match");
  };

  const validatePasswords = () => {
    if (password !== confirmPassword) return false;
    return true;
  };
  return (
    <div className="flex flex-row items-center justify-center lg:justify-between py-20 px-7 bg-[#faf9f9]">
      <div className="ml-[0px] lg:ml-[80px] border-[0.5px] rounded-[10px] shadow-[0_4px_64px_rgba(0,0,0,0.05)] border-[#cfcfcf] bg-white">
        <form onSubmit={signUpRequest} className="max-w-[505px] py-5 px-8">
          <p className="text-[25px] leading-[37.5px] mb-4 font-light">
            Welcome !
          </p>
          <h1 className="text-[31px] leading-[46.5px] font-[600]">
            Sign up to
          </h1>
          <p className="mb-[30px] text-base">Lorem Ipsum is simply</p>
          <label>Email</label>
          <input
            onChange={({ target }) => setEmail(target.value)}
            required
            type="email"
            className="mb-4 p-4 border-[0.6px] mt-[10px] rounded-[6px] border-[#888888] w-full"
            placeholder="Enter your Email"
          />
          <label>User name</label>
          <input
            onChange={({ target }) => setUsername(target.value)}
            required
            type="text"
            className="mb-4 p-4 border-[0.6px] mt-[10px] rounded-[6px] border-[#888888] w-full"
            placeholder="Enter your Username"
          />
          <label>Password</label>
          <div className="relative">
            <input
              onChange={({ target }) => setPassword(target.value)}
              required
              type={hidePass ? "password" : "text"}
              className="mb-4 p-4 border-[0.6px] mt-[10px] rounded-[6px] border-[#888888] w-full"
              placeholder="Enter your Password"
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
          <label>Confirm Password</label>
          <div className="relative">
            <input
              onChange={({ target }) => setConfirmPassword(target.value)}
              required
              type={hideConfirm ? "password" : "text"}
              className="mb-4 p-4 border-[0.6px] mt-[10px] rounded-[6px] border-[#888888] w-full"
              placeholder="Confirm your Password"
            />
            {hideConfirm ? (
              <BsEyeSlashFill
                onClick={() => setHideConfirm(!hideConfirm)}
                fontSize="23"
                className="absolute top-[28px] right-[25px] cursor-pointer"
              />
            ) : (
              <BsEyeFill
                onClick={() => setHideConfirm(!hideConfirm)}
                fontSize="23"
                className="absolute top-[28px] right-[25px] cursor-pointer"
              />
            )}
          </div>
          <input
            type="submit"
            className="text-lg my-2 p-4 transition-all border-[0.6px] rounded-[6px] border-[#888888] w-full bg-black text-white hover:bg-white cursor-pointer hover:text-black hover hover:border-black"
            value="Register"
          />

          <p className="mt-[20px] text-center text-[#7D7D7D] w-full">
            Already have an account ? {"  "}
            <Link href="/signin" className="text-[#000000] font-bold">
              Signin
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

export default Signup;
