import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const nav = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const handleData = (e) => {
    setErrorMsg("")
    let name = e.target.name;
    let value = e.target.value;
    let userdata = { ...userData };
    userdata[name] = value;
    setUserData(userdata);
  };

  function handleLogin() {
    if (userData.email === "" || userData.password === "") {
      setErrorMsg("Empty Field");
      return;
    } else {
      axios.get("http://localhost:4200/User").then((Response) => {
        const user = Response.data.find(
          (singleUSer) =>
            singleUSer.email === userData.email &&
            singleUSer.password === userData.password
        );
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          nav("/");
        } else {
          setErrorMsg("No user Found!");
        }
      });
    }
  }
  return (
    <div className="flex justify-center mt-[60px]">
      <div className="w-fit px-6 py-11 h-fit border-gray-500 border rounded-md mt-8 ">
        <div className="text-2xl text-red-500 ">Login</div>
        <div>
          <label className="flex justify-start mt-5 mb-2">
            Enter your Email
          </label>
          <input
            name="email"
            value={userData.email}
            onChange={handleData}
            className=" flex justify-start outline-none border border-t-0 border-x-0 border-b-red-500 pl-2 py-2 pr-4 "
            placeholder="example@gmail.com"
          />
        </div>
        <div>
          <label className="flex justify-start mt-5">Enter your Password</label>
          <input
            name="password"
            value={userData.password}
            onChange={handleData}
            className="flex justify-start outline-none border border-t-0 border-x-0 border-b-red-500 pl-2 py-2 pr-4 "
            placeholder="password123"
          />
        </div>
        <div className="flex justify-center text-orange-600 mt-4">
            {errorMsg}
        </div>
        <div className="mt-6">
          Dont have an account?{" "}
          <span className="text-red-500" onClick={()=>{nav("/Register")}}>
            Register Here!
          </span>
        </div>
        <div className="mt-5">
          <button
            onClick={handleLogin}
            className="w-full bg-red-500 text-white text-lg rounded-md py-1"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
