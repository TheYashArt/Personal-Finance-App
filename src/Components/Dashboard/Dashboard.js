import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({ onNavigate }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [trasactionData, setTrasactionData] = useState([]);
  const errorMsg = "No Record Found"

  useEffect(() => {
    axios.get(`http://localhost:4200/User/${user.id}`).then((response) => {
      if (response.status === 200) {
        let userData = response.data;
        userData.transactions.map((singletrans) => {
          axios
            .get(`http://localhost:4200/Income/${singletrans}`)
            .then((res) => {
              setTrasactionData([...trasactionData, res.data]);
            });
        });
      }
    });
  }, []);

  const deleteIncomeEntry = () => {
    console.log("deleted");
  };
  return (
    <div className="ml-7 mt-6">
      <div className="text-3xl font-semibold tracking-wide flex justify-start mb-5 border border-b-2 pb-3 border-t-0 border-x-0 ">
        Dashboard
      </div>
      <div className="flex justify-around gap-4">
        <div className="border border-gray-400 w-full px-4 py-8 rounded-md ">
          <div className="flex justify-between items-center">
            <div className="text-gray-600">Total balance</div>
            <div className="text-gray-700">
              <i class="fa-solid fa-wallet"></i>
            </div>
          </div>
          <div className="text-2xl flex justify-start mt-2 text-gray-900 text-center items-center">
            <i class="fa-solid fa-indian-rupee-sign"></i>{" "}
            <span className="ml-2 text-3xl">{user.balance}</span>
          </div>
        </div>
        <div className="border border-gray-400 w-full px-4 py-8 rounded-md ">
          <div className="flex justify-between items-center">
            <div className="text-gray-600">Total Income</div>
            <div className="text-gray-700">
              <i class="fa-solid fa-money-bill-trend-up"></i>
            </div>
          </div>
          <div className="text-2xl flex justify-start mt-2 text-gray-900 items-center">
            <i class="fa-solid fa-indian-rupee-sign"></i>{" "}
            <span className="ml-2 text-3xl">{user.total_income}</span>
          </div>
        </div>
        <div className="border border-gray-400 w-full px-4 py-8 rounded-md ">
          <div className="flex justify-between items-center ">
            <div className="text-gray-600">Total Expense</div>
            <div className="text-gray-700">
              <i class="fa-solid fa-arrow-down"></i>
            </div>
          </div>
          <div className="text-2xl flex justify-start mt-2 text-gray-900 items-center">
            <i class="fa-solid fa-indian-rupee-sign"></i>{" "}
            <span className="ml-2 text-3xl">{user.total_expense}</span>
          </div>
        </div>
      </div>

      <div className=" mt-5  p-4 rounded-md border border-gray-400">
        <div className="flex justify-start mb-2 ">Quick Actions</div>
        <div className="flex justify-between gap-3 text-white items-center">
          <div
            className="w-full bg-[#FF3D00] py-2 items-center rounded-md"
            onClick={() => onNavigate("Expense Tracker")}
          >
            <i class="fa-solid fa-plus"></i>
            <span className="ml-1">Add Expense</span>
          </div>
          <div
            className="w-full bg-[#FF3D00] py-2 items-center rounded-md"
            onClick={() => onNavigate("Income Review")}
          >
            <i class="fa-solid fa-plus"></i>
            <span className="ml-1">Add Income</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <div className="w-full ">Graphs are Coming soon...</div>
        <div className="w-full border border-gray-400 pt-5">
          <div className=" flex justify-start px-4 text-xl font-semibold mb-3">
            Recent Transactions
          </div>
          <div className="grid grid-cols-5">
            <div>Date</div>
            <div>Description</div>
            <div>Catagory</div>
            <div>Amount</div>
            <div>Actions</div>
          </div>
          <div>
            {trasactionData.length > 0 ? (
              trasactionData.map((singleData) => {
                return (
                  <div className="grid grid-cols-5 my-3 border py-3 border-x-0 border-b-0 border-t-gray-400">
                    <div className="max-w-[100px] break-words text-center flex justify-center ">
                      {singleData.date}
                    </div>
                    <div className="max-w-[100px] break-words text-center">
                      {singleData.description}
                    </div>
                    <div className="max-w-[100px] break-words text-center">
                      {singleData.catagory}
                    </div>
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
              })
            ) : (
              <div className="my-3 text-red-500"> {errorMsg} </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
