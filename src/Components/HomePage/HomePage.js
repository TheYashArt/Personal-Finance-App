import { useEffect, useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import ExpenseTracker from "../ExpenseTracker/ExpenseTracker";
import IncomeReview from "../IncomeReview/IncomeReview";
import UserProfile from "../UserProfile/UserProfile";

function HomePage() {
  const choice = [
    "Dashboard",
    "Expense Tracker",
    "Income Review",
    "User Profile",
  ];
  const [selected, setSelected] = useState("Dashboard");
  
  return (
    <div className="flex justify-end mt-[60px]">
      <div className="h-auto flex justify-start  shadow-gray-600 fixed left-0 shadow-sm min-h-screen ">
        <div className="mx-3">
          {choice.map((singleChoice) => {
            return (
              <div
                onClick={() => setSelected(singleChoice)}
                className="py-1 px-3 my-2 rounded-md w-[200px] text-left text-md "
                style={{
                  backgroundColor:
                    selected === singleChoice ? "#FF3D00" : "white",
                }}
              >
                {singleChoice}
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full mr-6 ml-[224px]">
        {selected === "Dashboard" ? (
          <Dashboard onNavigate={setSelected} />
        ) : selected === "Expense Tracker" ? (
          <ExpenseTracker />
        ) : selected === "Income Review" ? (
          <IncomeReview />
        ) : (
          <UserProfile />
        )}
      </div>
    </div>
  );
}

export default HomePage;
