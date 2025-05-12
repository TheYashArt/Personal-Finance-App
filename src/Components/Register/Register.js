import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const nav = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userName: "",
    quote: "",
    mob: "",
    total_income: 0,
    total_expense: 0,
    balance: 0,
    incomes: [],
    expenses: [],
    current_month_income: 0,
    average_income: 0,
    income_growth: 0,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleData = (event) => {
    setErrorMsg("")
    const name = event.target.name;
    const value = event.target.value;
    let userdata = { ...userData };
    userdata[name] = value;
    setUserData(userdata);
  };

  function handleRegister() {
    if (userData.email===""||userData.password===""||confirmPassword===""){
        setErrorMsg("Empty fields not allowed")
        return
    }
    if (userData.password !== confirmPassword) {
      setErrorMsg("Password does not match");
    } else {
      axios.get("http://localhost:4200/User").then((response) => {
        const userExists = response.data.some(
          (users) => users.email === userData.email
        );
        if (userExists) {
          setErrorMsg("User Exists with the Email ID");
        } else {
          axios
            .post("http://localhost:4200/User", userData)
            .then((response) => {
              if (response.status === 201) {
                nav("/Login");
                console.log("user created");
              } else {
                console.log(response.status);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  }
  return (
    <div className="flex justify-center">
      <div className="w-fit px-6 py-11 h-fit border-gray-500 border rounded-md mt-8 ">
        <div className="text-2xl text-red-500 ">Register</div>
        <div>
          <label className="flex justify-start mt-5 mb-2">
            Enter your Email
          </label>
          <input
            name="email"
            onChange={handleData}
            value={userData.email}
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
        <div>
          <label className="flex justify-start mt-5">
            Cnfirm your Password
          </label>
          <input
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            className="flex justify-start outline-none border border-t-0 border-x-0 border-b-red-500 pl-2 py-2 pr-4 "
            placeholder="password123"
          />
        </div>
        <div className="flex justify-center text-orange-600 mt-3">{errorMsg}</div>
        <div className="mt-6">
          already have an account?{" "}
          <span className="text-red-500" onClick={()=>{nav("/Login")}}>Login Here!</span>
        </div>
        <div className="mt-5">
          <button
            onClick={handleRegister}
            className="w-full bg-red-500 text-white text-lg rounded-md py-1"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
export default Register;
