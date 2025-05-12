import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

function IncomeReview({ refresh }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [errorMsg, setErrorMsg] = useState("");
  const [recentIncomeData, setRecentIncomeData] = useState([]);

  const [incomeData, setIncomeData] = useState({
    date: "",
    amount: 0,
    description: "",
    userId: user.id,
    type: "income",
  });
  //   const [trasactionData, setTrasactionData] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:4200/Transactions`).then((response) => {
      const transactionData = response.data;
      const filteredData = transactionData.filter((singleTrans) =>  singleTrans.type === "income" );

      setRecentIncomeData(filteredData)
    });
  }, []);

  const trasactionData = [
    {
      id: "1",
      userId: "6925",
      amount: 1000,
      date: "2023-10-01",
      category: "Salary",
      description: "Monthly Salary",
    },
    {
      id: "2",
      userId: "6925",
      amount: 1000,
      date: "2023-10-01",
      category: "Salary",
      description: "Monthly Salary",
    },
    {
      id: "3",
      userId: "6925",
      amount: 1000,
      date: "2023-10-01",
      category: "Salary",
      description: "Monthly Salary",
    },
  ];

  const handleIncomeChange = (e) => {
    setErrorMsg("");
    // setIncomeData.amount("")
    let name = e.target.name;
    let value = e.target.value;
    let income = { ...incomeData };
    income[name] = value;
    setIncomeData(income);
  };

  function handleIncomeAdd() {
    if (
      incomeData.amount === 0 ||
      incomeData.date === "" ||
      incomeData.source === ""
    ) {
      setErrorMsg("Empty Fields");
      return;
    }
    axios
      .post(`http://localhost:4200/Transactions`, incomeData)
      .then((Response) => {
        if (Response.status === 201) {
          const newTransaction = Response.data;
          if (!newTransaction.id) {
            console.error("Transaction ID is missing");
            return;
          }
          axios
            .get(`http://localhost:4200/User/${user.id}`)
            .then((response) => {
              if (response.status === 200) {
                const updatedUser = response.data;
                const updatedTrans = Array.isArray(updatedUser.transactions)
                  ? [...updatedUser.transactions, newTransaction.id]
                  : [newTransaction.id];
                axios
                  .put(`http://localhost:4200/User/${user.id}`, {
                    ...updatedUser,
                    transactions: updatedTrans,
                  })
                  .then((putres) => {
                    refresh("Dashboard");
                  });
              }
            });
        } else {
          console.log("error");
        }
      });
  }

  function deleteIncomeEntry() {
    console.log("deleetd");
  }
  return (
    <div className="ml-7 mt-6">
      <div className="text-3xl font-semibold tracking-wide flex justify-start mb-5 border border-b-2 pb-3 border-t-0 border-x-0 ">
        Expense Tracker
      </div>
      <div className="flex justify-around gap-4">
        <div className="border border-gray-400 w-full px-4 py-8 rounded-md ">
          <div className="flex justify-between items-center">
            <div className="text-gray-600">Current Month Income</div>
            <div className="text-gray-700">
              <i class="fa-solid fa-indian-rupee-sign"></i>
            </div>
          </div>
          <div className="text-2xl flex justify-start mt-2 text-gray-900 text-center items-center">
            <i class="fa-solid fa-indian-rupee-sign"></i>{" "}
            <span className="ml-2 text-3xl">{user.current_month_income}</span>
          </div>
        </div>
        <div className="border border-gray-400 w-full px-4 py-8 rounded-md ">
          <div className="flex justify-between items-center">
            <div className="text-gray-600">Average Month Income</div>
            <div className="text-gray-700">
              <i class="fa-solid fa-chart-line"></i>
            </div>
          </div>
          <div className="text-2xl flex justify-start mt-2 text-gray-900 items-center">
            <i class="fa-solid fa-indian-rupee-sign"></i>{" "}
            <span className="ml-2 text-3xl">{user.average_income}</span>
          </div>
        </div>
        <div className="border border-gray-400 w-full px-4 py-8 rounded-md ">
          <div className="flex justify-between items-center ">
            <div className="text-gray-600">Income Growth</div>
            <div className="text-gray-700">
              <i class="fa-regular fa-circle-up"></i>
            </div>
          </div>
          <div className="text-2xl flex justify-start mt-2 text-gray-900 items-center">
            <i class="fa-solid fa-indian-rupee-sign"></i>{" "}
            <span className="ml-2 text-3xl">{user.income_growth}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row mt-10 gap-6 ">
        <div className="basis-[700px] w-full border border-gray-400 rounded-md px-4 py-4">
          <div className="w-full flex justify-start text-lg">
            Add New Income Entry
          </div>
          <div className="flex justify-start ">
            <div>
              <div className="flex justify-start mb-2 mt-4">Amount</div>
              <input
                name="amount"
                value={incomeData.amount}
                onChange={handleIncomeChange}
                placeholder="eg. 10000"
                type="money"
                className=" border outline-none border-gray-400 px-3 py-1 w-[300px]"
              />
            </div>
          </div>
          <div className="flex justify-start ">
            <div>
              <div className="flex justify-start mb-2 mt-4">Source</div>
              <input
                name="description"
                value={incomeData.description}
                onChange={handleIncomeChange}
                placeholder="eg. Salary"
                type="text"
                className=" border outline-none border-gray-400 px-3 py-1 w-[300px]"
              />
            </div>
          </div>
          <div className="flex justify-start ">
            <div>
              <div className="flex justify-start mb-2 mt-4">Date</div>
              <input
                name="date"
                value={incomeData.date}
                onChange={handleIncomeChange}
                placeholder="eg. Salary"
                type="Date"
                className="placeholder-black border outline-none border-gray-400 px-3 py-1 w-[300px]"
              />
            </div>
          </div>
          <div className="my-3 text-red-600">{errorMsg}</div>
          <div>
            <button
              onClick={handleIncomeAdd}
              className="w-full bg-[#FF3D00] py-1 mt-4 rounded-md text-white"
            >
              Add Income
            </button>
          </div>
        </div>
        <div className="w-full border border-gray-400 rounded-md">
          <div className="w-full border border-gray-400 pt-5">
            <div className=" flex justify-start px-4 text-xl font-semibold mb-3">
              Recent Transactions
            </div>
            <div className="grid grid-cols-5">
              <div>Date</div>
              <div>Source</div>
              <div>Amount</div>
              <div>Actions</div>
            </div>
            <div>
              {recentIncomeData.map((singleData) => {
                return (
                  <div className="grid grid-cols-5 my-3 border py-3 border-x-0 border-b-0 border-t-gray-400">
                    <div className="max-w-[100px] break-words text-center flex justify-center ">
                      {singleData.date}
                    </div>
                    <div className="max-w-[100px] break-words text-center">
                      {singleData.description}
                    </div>
                    {/* <div className="max-w-[100px] break-words text-center">
                      {singleData.category}
                    </div> */}
                    <div className="max-w-[100px] break-words text-center">
                      {singleData.amount}
                    </div>
                    <div className="flex gap-6 max-w-[100px] justify-center items-center">
                      <button className="text-green-500">
                        <i class="fa-regular fa-pen-to-square"></i>
                      </button>
                      <button
                        className="text-red-500"
                        onClick={deleteIncomeEntry}
                      >
                        <i class="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default IncomeReview;
